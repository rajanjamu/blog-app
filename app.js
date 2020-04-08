const methodOverride        = require('method-override'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      express               = require('express'),
      app                   = express(),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      Post                  = require('./models/post'),
      User                  = require('./models/user'),
      seedDB                = require('./seeds');

// App Config
//seedDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use(require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to the Mongo Database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog_app', {
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true
});

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// ------------ RESTFUL ROUTES ------------
// ROOT
app.get('/', (req, res) => {
    res.redirect('/posts');
});

// 1. INDEX
app.get('/posts', (req, res) => {
    Post.find({}, (err, allPosts) => {
        if (err) console.log(err);
        else res.render('index', { posts: allPosts });
    });
});

// 2. NEW
app.get('/posts/new', isLoggedIn, (req, res) => {
    res.render('new');
});

// 3. SHOW
app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, foundPost) => {
        if (err) console.log('Error', err);
        else res.render('show', { post: foundPost });
    });
});

// 4. CREATE
app.post('/posts', (req, res) => {
    Post.create(req.body.post, (err, createdPost) => {
        if (err) console.log(err);
        else res.redirect(`/posts/${createdPost._id}`);
    })
});

// 5. EDIT
app.get('/posts/:id/edit', isLoggedIn, (req, res) => {
    Post.findById(req.params.id, (err, editPost) => {
        if (err) console.log(err);
        else res.render('edit', { post: editPost });
    });
});

// 6. UPDATE
app.put('/posts/:id', (req, res) => {
    Post.findByIdAndUpdate(req.params.id, req.body.post, (err, updatedPost) => {
        if (err) console.log(err);
        else res.redirect(`/posts/${req.params.id}`);
    });
});

// 7. DELETE
app.delete('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err) => {
        res.redirect('/posts');
    });
});

// AUTH ROUTES
app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.post('/register', (req, res) => {
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.redirect('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/');
        });
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
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

// Rest of the routes
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => console.log("Blogging App is running at port 3000!"));