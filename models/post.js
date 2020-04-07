const mongoose = require('mongoose');

// Declare the DB Schema
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);