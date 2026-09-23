# 🛒 KHMER STORE (ហាងទំនិញខ្មែរ)
### Fullstack E-Commerce Web Application with React.js & Bakong KHQR Payment

A modern, responsive fullstack e-commerce web platform built with **React 18**, **Vite**, **Tailwind CSS**, **Express.js**, and Cambodia's **National Bakong KHQR** payment integration.

---

## 🌟 Key Features

- ⚛️ **Modern React Frontend**: Fast Single Page Application (SPA) powered by Vite, React Router 6, and Tailwind CSS.
- 🇰🇭 **National Bakong KHQR**: Dynamic, on-the-fly KHQR code generation (Tag 29 Individual & Tag 30 Merchant) compatible with **ABA Mobile, Bakong App, Wing, ACLEDA, Canadia**, and all local Cambodian banking apps.
- 🛍️ **Interactive Cart Drawer**: Smooth slide-over cart with quantity steppers (`+`/`-`), item removal, live total calculations, and `localStorage` persistence.
- 👁️ **Product Quick View**: In-depth modal preview showing rating, reviews count, category tag, and product descriptions.
- 🏷️ **Discounts & Deals**: Dedicated promotions page with discount percentage badges and price calculation.
- 📦 **Complete Checkout Flow**: Customer order submission form (Name, Phone, Address) linked directly to the KHQR payment code.
- 📩 **Contact & Inquiries**: Customer messaging interface connected to the backend API.
- 📱 **Fully Responsive**: Optimized for mobile, tablet, and desktop viewports with Kantumruy Pro & Inter typography.

---

## 📂 Project Architecture

```
Ecommerce/
├── backend/
│   ├── data/
│   │   ├── products.json        # Product catalog database (source of truth)
│   │   ├── orders.json          # Persisted customer orders
│   │   ├── payments.json        # Persisted KHQR transaction records
│   │   └── messages.json        # Persisted contact messages
│   └── server.js                # Express 5 REST API & static server
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js        # Centralized API fetcher
│   │   ├── context/
│   │   │   ├── CartContext.jsx  # Cart, Drawer, and Modal state
│   │   │   └── ToastContext.jsx # Global toast notifications
│   │   ├── components/
│   │   │   ├── AnnouncementBar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── CartDrawer.jsx
│   │   │   ├── PaymentModal.jsx
│   │   │   ├── QuickViewModal.jsx
│   │   │   └── Toast.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx     # Home view + filters + sorting
│   │   │   ├── ProductsPage.jsx # Full product catalog
│   │   │   ├── DiscountsPage.jsx# Promotional discount products
│   │   │   ├── AboutPage.jsx    # Store story & values
│   │   │   └── ContactPage.jsx  # Contact details & form
│   │   ├── App.jsx              # Routing & root layout
│   │   ├── main.jsx             # React DOM entry point
│   │   └── index.css            # Tailwind directives & custom scrollbars
│   ├── index.html               # Vite HTML template
│   ├── package.json             # Frontend dependencies
│   ├── tailwind.config.js       # Theme styling & Kantumruy Pro font
│   └── vite.config.js           # Vite dev server + proxy to backend
├── .env                         # Environment credentials (API tokens & Bakong account)
├── .env.example                 # Sample environment template
├── package.json                 # Root script runner
└── README.md                    # Installation & setup guide
```

---

## 📋 Prerequisites

Ensure you have the following installed on your computer:
- **Node.js**: Version `18.0.0` or higher ([Download Node.js](https://nodejs.org/))
- **npm**: Version `9.0.0` or higher (bundled with Node.js)

---

## 🚀 Installation & Setup

### 1. Clone or Open the Repository
```bash
cd /path/to/Ecommerce
```

### 2. Install Dependencies

You can install all dependencies for both the backend and frontend in one command:

```bash
npm run install:all
```

*Or install them manually:*
```bash
# Install root/backend dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

---

### 3. Configure Environment Variables (`.env`)

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Open `.env` and fill in your Bakong account details:

```env
# Port for Express Backend
PORT=3000

# Bakong Account Details (Registered on NBC Bakong)
BAKONG_ACCOUNT_NAME=CHAMNOL MAO
BAKONG_ACCOUNT_USERNAME=chamnol_mao@bkrt
BAKONG_PHONE_NUMBER=855964124754
BAKONG_ACCESS_TOKEN=your_jwt_access_token_here

# Bakong API URLs
BAKONG_PROD_BASE_API_URL=https://api-bakong.nbc.gov.kh/v1
BAKONG_DEV_BASE_API_URL=https://sit-api-bakong.nbc.gov.kh/v1

# ABA PayWay / KHQR Settings
ABA_PAYWAY_ACCOUNT_ID=chamnol_mao@bkrt
ABA_PAYWAY_MERCHANT_NAME=CHAMNOL MAO
ABA_PAYWAY_MERCHANT_CITY=Phnom Penh
ABA_PAYWAY_MERCHANT_ID=100200
ABA_PAYWAY_ACQUIRING_BANK=ABA Bank
```

> ⚠️ **Important**: `BAKONG_ACCOUNT_USERNAME` must be a valid, active account in the National Bakong system (e.g. `yourname@bkrt` or `yourname@abaa`).

---

## 💻 Running the Application

### Option A: Development Mode (Recommended)
Runs the Express backend on port `3000` and the Vite React frontend with Hot Module Replacement (HMR) on port `5173`.

Open two terminal windows:

**Terminal 1 (Backend Server):**
```bash
npm run server
```
*Backend runs at: `http://localhost:3000`*

**Terminal 2 (React Frontend):**
```bash
npm run client
```
*Frontend runs at: `http://localhost:5173`*

Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

### Option B: Production Build (Express Serves React SPA)

Build the React frontend and run everything via the single Express server:

```bash
# 1. Build React app into frontend/dist
npm run build:client

# 2. Start the Express server
npm start
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🔌 API Endpoints Reference

The backend exposes the following REST API endpoints:

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status check |
| `GET` | `/api/products` | Get products (supports `?search=`, `?category=`, `?sort=`) |
| `GET` | `/api/products/:id` | Get single product details by ID |
| `GET` | `/api/discounts` | Get products with active discount promotions |
| `POST` | `/api/payments/qr` | Generate dynamic Bakong KHQR code for cart items |
| `POST` | `/api/orders` | Submit customer order and save to `orders.json` |
| `POST` | `/api/contact` | Submit contact/inquiry message to `messages.json` |

---

## ❓ Troubleshooting & FAQs

### 1. Bank scanner says "Invalid QR code"
- Ensure your `BAKONG_ACCOUNT_USERNAME` in `.env` is an active Bakong account (e.g. `chamnol_mao@bkrt`).
- For personal accounts, the system automatically uses **EMV Tag 29 (Individual KHQR)**, which is natively supported by all Cambodian banks (ABA, Wing, Acleda, etc.).
- If you have an official NBC Merchant contract with a commercial bank, you can set `KHQR_TYPE=merchant` in `.env`.

### 2. Products not loading or 404 on API calls
- Ensure the backend server is running on `http://localhost:3000` (`npm run server` or `npm start`).
- In development, Vite will automatically proxy requests from `http://localhost:5173/api/*` to `http://localhost:3000/api/*`.

### 3. Port 3000 or 5173 is already in use
- Change the `PORT` in `.env` for the backend.
- Vite will automatically pick the next available port (e.g., `5174`) if `5173` is occupied.

---

## 📄 License

This project is private and developed for **KHMER STORE**. All rights reserved.
