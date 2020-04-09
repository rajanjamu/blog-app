const express   = require('express'),
      router    = express.Router(),
      Post      = require('../models/post');

// 1. INDEX
router.get('/posts', (req, res) => {
    Post.find({}, (err, allPosts) => {
        if (err) console.log(err);
        else res.render('index', { posts: allPosts });
    });
});

// 2. NEW
router.get('/posts/new', isLoggedIn, (req, res) => {
    res.render('new');
});

// 3. SHOW
router.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if (err) console.log('Error', err);
        else res.render('show', { post: foundPost });
    });
});

// 4. CREATE
router.post('/posts', (req, res) => {
    Post.create(req.body.post, (err, createdPost) => {
        if (err) console.log(err);
        else res.redirect(`/posts/${createdPost._id}`);
    })
});

// 5. EDIT
router.get('/posts/:id/edit', isLoggedIn, (req, res) => {
    Post.findById(req.params.id, (err, editPost) => {
        if (err) console.log(err);
        else res.render('edit', { post: editPost });
    });
});

// 6. UPDATE
router.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
        if (err) console.log(err);
        else res.redirect(`/posts/${req.params.id}`);
    });
});

// 7. DELETE
router.delete('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        res.redirect('/posts');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;