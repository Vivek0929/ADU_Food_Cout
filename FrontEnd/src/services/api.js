const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const apiService = {
  // Authentication API Methods
  auth: {
    async signup(email, password, name) {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Signup failed');
      return data;
    },

    async login(email, password) {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Login failed');
      return data;
    },

    async logout() {
      const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Logout failed');
      return data;
    },

    async getCurrentUser() {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to fetch current user');
      return data;
    }
  },

  // Food / Menu API Methods
  food: {
    async getAllFoods() {
      const res = await fetch(`${API_URL}/api/food`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to fetch foods');
      return data;
    },

    async addFood(foodData) {
      const res = await fetch(`${API_URL}/api/food`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(foodData),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to add food item');
      return data;
    },

    async updateFood(id, foodData) {
      const res = await fetch(`${API_URL}/api/food/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(foodData),
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to update food item');
      return data;
    },

    async deleteFood(id) {
      const res = await fetch(`${API_URL}/api/food/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to delete food item');
      return data;
    }
  },

  // Admin-Specific API Methods
  admin: {
    async getAllUsers() {
      const res = await fetch(`${API_URL}/api/admin/users`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to fetch users');
      return data;
    }
  }
};
