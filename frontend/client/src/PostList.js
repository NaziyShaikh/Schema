// src/PostsList.js
import React, { useState, useEffect } from 'react';
import { fetchPosts } from './api';

const PostsList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts. Please try again.');
                setLoading(false);
            }
        };

        loadPosts();
        const interval = setInterval(() => {
            loadPosts();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="posts-container">
            <h2>Posts</h2>
            {posts.length === 0 ? (
                <p>No posts available</p>
            ) : (
                <div className="posts-list">
                    {posts.map(post => (
                        <div key={post._id} className="post-card">
                            <h3>{post.title}</h3>
                            <p className="post-content">{post.content}</p>
                            <div className="post-meta">
                                <span>By: {post.user ? post.user.name : 'Unknown User'}</span>
                                <span className="post-email">({post.user ? post.user.email : 'N/A'})</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostsList;