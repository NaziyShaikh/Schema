// src/App.js
import React from 'react';
import UserForm from './UserForm';
import PostForm from './PostForm';
import PostList from './PostList';
import './App.css'; // Import your CSS file for styling

const App = () => {
    return (
        <div className="app-container">
            <h1>User Management</h1>
            <UserForm />
            <h1>Post Management</h1>
            <PostForm />
            <PostList />
        </div>
    );
};

export default App;