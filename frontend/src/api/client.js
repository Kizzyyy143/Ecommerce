// API Client for Khmer Store
const API_BASE = '/api';

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.search) query.set('search', params.search);
  if (params.category && params.category !== 'all') query.set('category', params.category);
  if (params.sort && params.sort !== 'featured') query.set('sort', params.sort);

  const res = await fetch(`${API_BASE}/products?${query.toString()}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch products');
  return data.data || [];
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch product');
  return data.data;
}

export async function fetchDiscounts() {
  const res = await fetch(`${API_BASE}/discounts`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to fetch discounts');
  return data.data || [];
}

export async function createKhqrPayment(items) {
  const res = await fetch(`${API_BASE}/payments/qr`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ items }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to generate KHQR');
  return data.data;
}

export async function submitOrder(orderData) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to submit order');
  return data.data;
}

export async function submitContactMessage(messageData) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(messageData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Failed to send message');
  return data.data;
}
