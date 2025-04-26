const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Post = require('./models/Post');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/schemareference';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Test route to verify server is running
app.get('/', (req, res) => {
    res.json({ message: 'Server is running', status: 'OK' });
});

// Routes

// Create user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create post
app.post('/posts', async (req, res) => {
    try {
        const { title, content, userId } = req.body;
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const post = new Post({
            title,
            content,
            user: userId
        });

        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all posts with user info
app.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('user');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});