// src/PostForm.js
import React, { useState } from 'react';

const PostForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState(''); // State for feedback message

   // src/PostForm.js
   const handleSubmit = async (e) => {
       e.preventDefault();
       try {
           const response = await fetch('http://localhost:5000/posts', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ title, content, user: userId }), // Sending post data
           });
   
           if (response.ok) {
               setMessage('Post added successfully!'); // Success message
               setTitle('');
               setContent('');
               setUserId('');
           } else {
               const errorData = await response.json();
               setMessage(`Failed to add post: ${errorData.details}`); // Display error details
           }
       } catch (error) {
           setMessage('An error occurred. Please try again.'); // Error handling
       }
   };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" required />
            <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" required />
            <button type="submit">Add Post</button>
            {message && <p>{message}</p>} {/* Display the feedback message */}
        </form>
    );
};

export default PostForm;