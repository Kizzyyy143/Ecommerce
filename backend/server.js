require("dotenv").config();
const express = require("express");
const QRCode = require("qrcode");
const { BakongKHQR, khqrData, MerchantInfo } = require("bakong-khqr");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const app = express();
const port = Number(process.env.PORT) || 3000;
const backendDir = __dirname;
const frontendDir = path.join(backendDir, "..", "frontend");
const dataDir = path.join(backendDir, "data");
const products = JSON.parse(fs.readFileSync(path.join(dataDir, "products.json"), "utf8"));
const ordersFile = path.join(dataDir, "orders.json");
const messagesFile = path.join(dataDir, "messages.json");
const paymentsFile = path.join(dataDir, "payments.json");
const bakongConfig = {
  accountId: process.env.BAKONG_ACCOUNT_ID,
  merchantName: process.env.BAKONG_MERCHANT_NAME || "KHMER STORE",
  merchantCity: process.env.BAKONG_MERCHANT_CITY || "Phnom Penh",
  merchantId: process.env.BAKONG_MERCHANT_ID,
  acquiringBank: process.env.BAKONG_ACQUIRING_BANK
};

app.use(express.json({ limit: "50kb" }));
app.use((request, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (request.method === "OPTIONS") return response.sendStatus(204);
  next();
});

function readCollection(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function appendToCollection(file, value) {
  const collection = readCollection(file);
  collection.push(value);
  fs.writeFileSync(file, JSON.stringify(collection, null, 2));
}

function validCustomer(customer) {
  return customer && typeof customer.name === "string" && customer.name.trim().length >= 2
    && typeof customer.phone === "string" && customer.phone.trim().length >= 6
    && typeof customer.address === "string" && customer.address.trim().length >= 5;
}

app.get("/api/health", (request, response) => {
  response.json({ status: "ok", service: "khmer-store-api" });
});

app.get("/api/products", (request, response) => {
  const search = String(request.query.search || "").toLowerCase().trim();
  const category = String(request.query.category || "all");
  const sort = String(request.query.sort || "featured");
  let result = products.filter((product) => {
    const matchesSearch = !search || `${product.title} ${product.description}`.toLowerCase().includes(search);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (sort === "low-high") result = result.sort((a, b) => a.price - b.price);
  if (sort === "high-low") result = result.sort((a, b) => b.price - a.price);
  if (sort === "rating") result = result.sort((a, b) => b.rating - a.rating);

  response.json({ data: result, total: result.length });
});

app.get("/api/products/:id", (request, response) => {
  const product = products.find((item) => item.id === Number(request.params.id));
  if (!product) return response.status(404).json({ error: "Product not found" });
  response.json({ data: product });
});

app.post("/api/payments/qr", async (request, response) => {
  if (!bakongConfig.accountId || !bakongConfig.merchantId || !bakongConfig.acquiringBank) {
    return response.status(503).json({ error: "Bakong merchant configuration is missing" });
  }
  const { items } = request.body;
  if (!Array.isArray(items) || items.length === 0) {
    return response.status(400).json({ error: "At least one cart item is required" });
  }

  const normalizedItems = items.map((item) => {
    const product = products.find((entry) => entry.id === Number(item.productId));
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return null;
    return { productId: product.id, title: product.title, price: product.price, quantity };
  });
  if (normalizedItems.some((item) => item === null)) {
    return response.status(400).json({ error: "One or more cart items are invalid" });
  }

  const amount = Number(normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
  const reference = `KS-${crypto.randomUUID().split("-")[0].toUpperCase()}`;
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
  const merchantInfo = new MerchantInfo(
    bakongConfig.accountId,
    bakongConfig.merchantName,
    bakongConfig.merchantCity,
    bakongConfig.merchantId,
    bakongConfig.acquiringBank,
    {
      currency: khqrData.currency.usd,
      amount,
      billNumber: reference,
      storeLabel: bakongConfig.merchantName,
      terminalLabel: "KHMER STORE",
      expirationTimestamp: Date.parse(expiresAt),
      merchantCategoryCode: "5999"
    }
  );
  const khqrResponse = new BakongKHQR().generateMerchant(merchantInfo);
  if (khqrResponse.status.code !== 0 || !khqrResponse.data?.qr) {
    return response.status(502).json({ error: "Bakong could not generate a payment QR" });
  }
  const qrDataUrl = await QRCode.toDataURL(khqrResponse.data.qr, { errorCorrectionLevel: "M", margin: 2, width: 320 });
  const payment = { id: crypto.randomUUID(), reference, receiver: bakongConfig.accountId, amount, currency: "USD", items: normalizedItems, status: "pending", expiresAt, createdAt: new Date().toISOString(), provider: "bakong", qrMd5: khqrResponse.data.md5 };
  appendToCollection(paymentsFile, payment);

  response.status(201).json({ data: { ...payment, qrDataUrl }, message: "Scan this KHQR code to continue payment" });
});

app.post("/api/orders", (request, response) => {
  const { customer, items } = request.body;
  if (!validCustomer(customer) || !Array.isArray(items) || items.length === 0) {
    return response.status(400).json({ error: "Customer name, phone, address, and at least one item are required" });
  }

  const normalizedItems = items.map((item) => {
    const product = products.find((entry) => entry.id === Number(item.productId));
    const quantity = Math.max(1, Math.floor(Number(item.quantity)));
    return product ? { productId: product.id, title: product.title, price: product.price, quantity } : null;
  });
  if (normalizedItems.some((item) => item === null)) {
    return response.status(400).json({ error: "One or more products are invalid" });
  }

  const total = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: crypto.randomUUID(),
    customer: { name: customer.name.trim(), phone: customer.phone.trim(), address: customer.address.trim() },
    items: normalizedItems,
    total: Number(total.toFixed(2)),
    status: "pending",
    createdAt: new Date().toISOString()
  };
  appendToCollection(ordersFile, order);
  response.status(201).json({ message: "Order created", data: order });
});

app.post("/api/contact", (request, response) => {
  const { name, email, message } = request.body;
  if (![name, email, message].every((value) => typeof value === "string" && value.trim())) {
    return response.status(400).json({ error: "Name, email, and message are required" });
  }
  const contactMessage = { id: crypto.randomUUID(), name: name.trim(), email: email.trim(), message: message.trim(), createdAt: new Date().toISOString() };
  appendToCollection(messagesFile, contactMessage);
  response.status(201).json({ message: "Message received", data: { id: contactMessage.id } });
});

app.use(express.static(frontendDir));
app.use((request, response) => response.status(404).json({ error: "Route not found" }));

app.listen(port, () => console.log(`Khmer Store running at http://localhost:${port}`));
