const API = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
console.log("Current API URL:", API);

export const signup = async (data) => {
  const res = await fetch(`${API}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};
// Farmer APIs
export const getMyProducts = async (token) => {
  const res = await fetch(`${API}/products/my`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const addProduct = async (data, token) => {
  const res = await fetch(`${API}/products/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

export const getFarmerOrders = async (token) => {
  const res = await fetch(`${API}/orders/farmer`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const acceptOrder = async (id, token) => {
  const res = await fetch(`${API}/orders/${id}/accept`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const rejectOrder = async (id, token) => {
  const res = await fetch(`${API}/orders/${id}/reject`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};


// View available products
export const getAvailableProducts = async (token) => {
  const res = await fetch(`${API}/orders/products`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

// Place order
export const placeOrder = async (data, token) => {
  const res = await fetch(`${API}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
};

// View my orders
export const getMyOrders = async (token) => {
  const res = await fetch(`${API}/orders/restaurant`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

// View available deliveries
export const getAvailableDeliveries = async (token) => {
  const res = await fetch(`${API}/orders/driver`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

// Pick delivery
export const pickDelivery = async (id, token) => {
  const res = await fetch(`${API}/orders/${id}/pick`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

// Mark delivered
export const deliverOrder = async (id, token) => {
  const res = await fetch(`${API}/orders/${id}/deliver`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};

export const getDriverOrders = async (token) => {
  const res = await fetch(`${API}/orders/driver/my-deliveries`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return res.json();
};