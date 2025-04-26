// src/api.js
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
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

export const fetchPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return response.json();
};

export const addPost = async (postData) => {
    const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
    });
    return response;
};

export const refreshPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
        throw new Error('Failed to refresh posts');
    }
    return response.json();
};