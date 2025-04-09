// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://naziya:wvUfuGUHt26GYPd@cluster0.oswlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Route for adding a user
app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send({ error: 'Failed to add user', details: error.message });
    }
});

// Route for adding a post
app.post('/posts', async (req, res) => {
    const post = new Post(req.body);
    try {
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(400).send({ error: 'Failed to add post', details: error.message });
    }
});

// Route for fetching all users
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.status(200).send(users);
});

// Route for fetching all posts
app.get('/posts', async (req, res) => {
    const posts = await Post.find().populate('user');
    res.status(200).send(posts);
});

// Root route
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'API is running',
        endpoints: {
            users: '/users',
            posts: '/posts'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested resource could not be found'
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});