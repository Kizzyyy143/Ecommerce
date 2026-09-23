require("dotenv").config();
const express = require("express");
const QRCode = require("qrcode");
const { BakongKHQR, khqrData, IndividualInfo, MerchantInfo } = require("bakong-khqr");
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
const rawAccountId = process.env.BAKONG_ACCOUNT_USERNAME || process.env.ABA_PAYWAY_ACCOUNT_ID || process.env.BAKONG_ACCOUNT_ID;
const rawMerchantName = process.env.BAKONG_ACCOUNT_NAME || process.env.ABA_PAYWAY_MERCHANT_NAME || process.env.BAKONG_MERCHANT_NAME;
const rawMerchantId = process.env.ABA_PAYWAY_MERCHANT_ID || process.env.BAKONG_MERCHANT_ID;
const rawAcquiringBank = process.env.ABA_PAYWAY_ACQUIRING_BANK || process.env.BAKONG_ACQUIRING_BANK;

const abaPayWayConfig = {
  accountId: rawAccountId && !rawAccountId.includes("your_") ? rawAccountId : "chamnol_mao@bkrt",
  merchantName: rawMerchantName && !rawMerchantName.includes("your_") ? rawMerchantName : "CHAMNOL MAO",
  merchantCity: process.env.ABA_PAYWAY_MERCHANT_CITY || process.env.BAKONG_MERCHANT_CITY || "Phnom Penh",
  merchantId: rawMerchantId && !rawMerchantId.includes("your_") ? rawMerchantId : "100200",
  acquiringBank: rawAcquiringBank && !rawAcquiringBank.includes("your_") ? rawAcquiringBank : "ABA Bank"
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

app.get("/api/discounts", (request, response) => {
  const discounts = products
    .filter((product) => product.oldPrice && product.oldPrice > product.price)
    .map((product) => ({
      ...product,
      discountPercent: Math.round((1 - product.price / product.oldPrice) * 100)
    }));
  response.json({ data: discounts, total: discounts.length });
});

app.post("/api/payments/qr", async (request, response) => {
  try {
    if (!abaPayWayConfig.accountId || !abaPayWayConfig.merchantId || !abaPayWayConfig.acquiringBank) {
      console.error("[KHQR ERROR]: ABA PayWay merchant configuration is incomplete", abaPayWayConfig);
      return response.status(503).json({ error: "ABA PayWay merchant configuration is missing" });
    }
    const { items } = request.body || {};
    if (!Array.isArray(items) || items.length === 0) {
      console.warn("[KHQR WARN]: Empty cart items received", request.body);
      return response.status(400).json({ error: "At least one cart item is required" });
    }

    const normalizedItems = items.map((item) => {
      const product = products.find((entry) => entry.id === Number(item.productId));
      const quantity = Number(item.quantity);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) return null;
      return { productId: product.id, title: product.title, price: product.price, quantity };
    });
    if (normalizedItems.some((item) => item === null)) {
      console.warn("[KHQR WARN]: Invalid cart item found in payload", items);
      return response.status(400).json({ error: "One or more cart items are invalid" });
    }

    const amount = Number(normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
    const reference = `KS-${crypto.randomUUID().split("-")[0].toUpperCase()}`;
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    const isMerchant = process.env.KHQR_TYPE === "merchant" && abaPayWayConfig.merchantId && abaPayWayConfig.acquiringBank;
    let khqrResponse;

    if (isMerchant) {
      const merchantInfo = new MerchantInfo(
        abaPayWayConfig.accountId,
        abaPayWayConfig.merchantName,
        abaPayWayConfig.merchantCity,
        abaPayWayConfig.merchantId,
        abaPayWayConfig.acquiringBank,
        {
          currency: khqrData.currency.usd,
          amount,
          billNumber: reference,
          storeLabel: abaPayWayConfig.merchantName,
          terminalLabel: "KHMER STORE",
          expirationTimestamp: Date.parse(expiresAt),
          merchantCategoryCode: "5999"
        }
      );
      khqrResponse = new BakongKHQR().generateMerchant(merchantInfo);
    } else {
      const individualInfo = new IndividualInfo(
        abaPayWayConfig.accountId,
        abaPayWayConfig.merchantName,
        abaPayWayConfig.merchantCity,
        {
          currency: khqrData.currency.usd,
          amount,
          billNumber: reference,
          storeLabel: abaPayWayConfig.merchantName,
          terminalLabel: "KHMER STORE",
          expirationTimestamp: Date.parse(expiresAt)
        }
      );
      khqrResponse = new BakongKHQR().generateIndividual(individualInfo);
    }

    if (khqrResponse.status.code !== 0 || !khqrResponse.data?.qr) {
      console.error("[KHQR GENERATION FAILED]:", khqrResponse.status);
      return response.status(502).json({ error: khqrResponse.status.message || "ABA PayWay could not generate a payment QR" });
    }
    const qrDataUrl = await QRCode.toDataURL(khqrResponse.data.qr, { errorCorrectionLevel: "M", margin: 2, width: 320 });
    const payment = {
      id: crypto.randomUUID(),
      reference,
      receiver: abaPayWayConfig.accountId,
      amount,
      currency: "USD",
      items: normalizedItems,
      status: "pending",
      expiresAt,
      createdAt: new Date().toISOString(),
      provider: "abapayway",
      qrMd5: khqrResponse.data.md5
    };
    appendToCollection(paymentsFile, payment);

    response.status(201).json({ data: { ...payment, qrDataUrl }, message: "Scan this KHQR code to continue payment" });
  } catch (err) {
    console.error("[KHQR ENDPOINT SERVER EXCEPTION]:", err);
    response.status(500).json({ error: err.message || "Internal server error during KHQR generation" });
  }
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

const distDir = path.join(frontendDir, "dist");
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((request, response, next) => {
    if (request.method === "GET" && !request.path.startsWith("/api/")) {
      return response.sendFile(path.join(distDir, "index.html"));
    }
    next();
  });
} else {
  app.use(express.static(frontendDir));
}
app.use((request, response) => response.status(404).json({ error: "Route not found" }));

app.listen(port, () => console.log(`Khmer Store running at http://localhost:${port}`));
