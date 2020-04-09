const mongoose  = require('mongoose');
const User      = require('./user');

// Declare the DB Schema
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: User
        },
        username: String
    },
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);