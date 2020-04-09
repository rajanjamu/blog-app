const express   = require('express'),
      router    = express.Router(),
      passport  = require('passport'),
      User      = require('../models/user');

// ------------ RESTFUL ROUTES ------------
// ROOT
router.get('/', (req, res) => {
    res.redirect('/posts');
});

// AUTH ROUTES
router.get('/register', (req, res) => {
    if (req.user) {
        req.flash('error', 'You are already logged in!')
        return res.redirect('/posts');
    }
    res.render('register');
});

router.get('/login', (req, res) => {
    if (req.user) {
        req.flash('error', 'You are already logged in!')
        return res.redirect('/posts');
    }
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You have been successfully logged out!');
    res.redirect('/posts');
});

router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, () => {
            req.flash('success', 'Welcome to BLOG, ' + user.username.charAt(0).toUpperCase() + user.username.slice(1) + '!');
            res.redirect('/posts');
        });
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/posts',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password. Please try again!',
    successFlash: 'You have been successfully logged in!'
}), (req, res) => {
    passport.authenticate('local')(req, res, () => {
        req.flash('success', 'You have been successfully logged in!');
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