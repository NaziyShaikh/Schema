// src/api.js
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const fetchUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addUser = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const fetchPosts = async () => {
    try {
        const response = await fetch(`${API_URL}/posts`);
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const addPost = async (postData) => {
    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error('Failed to add post');
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const refreshPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
        throw new Error('Failed to refresh posts');
    }
    return response.json();
};