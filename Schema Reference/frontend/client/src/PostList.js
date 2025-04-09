// src/PostList.js
import React, { useEffect, useState } from 'react';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch('http://localhost:5000/posts');
        const data = await response.json();
        setPosts(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div>
            {posts.map(post => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <p>Author: {post.user ? post.user.name : 'Unknown'}</p>
                </div>
            ))}
        </div>
    );
};

export default PostList;