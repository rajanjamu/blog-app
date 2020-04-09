const express   = require('express'),
      router    = express.Router(),
      passport  = require('passport');

// ------------ RESTFUL ROUTES ------------
// ROOT
router.get('/', (req, res) => {
    res.redirect('/posts');
});

// AUTH ROUTES
router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login', { login_errors: req.session.messages || null });
    req.session.messages = [];
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

router.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register', { errMsg: err.message });
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: "Invalid username or password"
}), (req, res) => {
    passport.authenticate('local')(req, res, () => {
        res.redirect('/');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;