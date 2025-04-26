// models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Reference to User schema
});

module.exports = mongoose.model('Post', PostSchema);