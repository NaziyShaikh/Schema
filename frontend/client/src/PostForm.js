// src/PostForm.js
import React, { useState, useEffect } from 'react';
import { fetchUsers, addPost, refreshPosts } from './api';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setLoading(false);
            }
        };
        loadUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            setMessage('Please select a user');
            return;
        }

        try {
            const response = await addPost({ title, content, userId });
            
            if (response.ok) {
                setMessage('Post added successfully!');
                setTitle('');
                setContent('');
                setUserId('');
                
                
                await refreshPosts();
               
            } else {
                const errorData = await response.json();
                setMessage(`Failed to add post: ${errorData.error}`);
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-form">
            <h2>Add New Post</h2>
            
            <div className="form-group">
                <label>Title:</label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter post title" 
                    required 
                />
            </div>
            
            <div className="form-group">
                <label>Content:</label>
                <textarea 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    placeholder="Enter post content" 
                    required 
                />
            </div>

            <div className="form-group">
                <label>User:</label>
                {loading ? (
                    <select disabled>
                        <option>Loading users...</option>
                    </select>
                ) : (
                    <select 
                        value={userId} 
                        onChange={(e) => setUserId(e.target.value)} 
                        required 
                    >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user._id} value={user._id}>
                                {user.name} ({user.email})
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <button type="submit">Add Post</button>
            {message && <div className="message">{message}</div>}
        </form>
    );
};

export default PostForm;