// src/UserForm.js
import React, { useState } from 'react';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(''); // State for feedback message

  // src/UserForm.js
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:5000/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email }), // Sending user data
          });
  
          if (response.ok) {
              setMessage('User added successfully!'); // Success message
              setName('');
              setEmail('');
          } else {
              const errorData = await response.json();
              setMessage(`Failed to add user: ${errorData.details}`); // Display error details
          }
      } catch (error) {
          setMessage('An error occurred. Please try again.'); // Error handling
      }
  };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Add User</button>
            {message && <p>{message}</p>} {/* Display the feedback message */}
        </form>
    );
};

export default UserForm;