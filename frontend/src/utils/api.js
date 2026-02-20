const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const safeFetch = (url, opts) =>
  fetch(url, opts)
    .then((res) => res.json())
    .catch((err) => ({ success: false, message: err.message || 'Network error. Ensure backend is running.' }));

export const usersAPI = {
  getAll: () => safeFetch(`${API_BASE}/users`),
};

export const schemesAPI = {
  getAll: () => safeFetch(`${API_BASE}/schemes`),
  create: (data) =>
    fetch(`${API_BASE}/schemes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  update: (id, data) =>
    fetch(`${API_BASE}/schemes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  delete: (id) =>
    fetch(`${API_BASE}/schemes/${id}`, { method: 'DELETE' }).then((res) =>
      res.json()
    ),
};

export const productsAPI = {
  getAll: () => safeFetch(`${API_BASE}/products`),
  getByShopkeeper: (id) => safeFetch(`${API_BASE}/products/shop/${id}`),
  create: (data) =>
    fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  update: (id, data) =>
    fetch(`${API_BASE}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  delete: (id) => fetch(`${API_BASE}/products/${id}`, { method: 'DELETE' }).then((res) => res.json()),
};

export const ordersAPI = {
  getByShopkeeper: (id) => safeFetch(`${API_BASE}/orders/shop/${id}`),
  getByFarmer: (id) => safeFetch(`${API_BASE}/orders/farmer/${id}`),
  create: (data) =>
    fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
  updateStatus: (id, status) =>
    fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    }).then((res) => res.json()),
};

export const shopProfileAPI = {
  get: (userId) => fetch(`${API_BASE}/shop-profile/${userId}`).then((res) => res.json()),
  update: (userId, data) =>
    fetch(`${API_BASE}/shop-profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};

export const shopStatsAPI = {
  get: (shopkeeperId) => safeFetch(`${API_BASE}/shop-stats/${shopkeeperId}`),
};

export const uploadAPI = {
  image: (file) => {
    const fd = new FormData();
    fd.append('image', file);
    return fetch(`${API_BASE}/upload/image`, { method: 'POST', body: fd }).then((res) =>
      res.json()
    );
  },
};

export const razorpayAPI = {
  createOrder: (orderId) =>
    fetch(`${API_BASE}/razorpay/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    }).then((res) => res.json()),
  verifyPayment: (data) =>
    fetch(`${API_BASE}/razorpay/verify-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};

export const authAPI = {
  signup: (data) =>
    fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),

  login: (data) =>
    fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((res) => res.json()),
};
