// src/UserForm.js
import React, { useState } from 'react';
import { addUser } from './api';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addUser({ name, email });
            
            if (response.ok) {
                setMessage('User added successfully!');
                setName('');
                setEmail('');
            } else {
                const errorData = await response.json();
                setMessage(`Failed to add user: ${errorData.details}`);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Name" 
                required 
            />
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Email" 
                required 
            />
            <button type="submit">Add User</button>
            {message && <p style={{ color: message.includes('error') ? 'red' : 'green' }}>{message}</p>}
        </form>
    );
};

export default UserForm;