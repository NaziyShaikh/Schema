// src/api.js
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

export const addUser = async (userData) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response;
};