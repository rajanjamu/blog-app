const methodOverride        = require('method-override'),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      express               = require('express'),
      app                   = express(),
      flash                 = require('connect-flash'),
      passport              = require('passport'),
      LocalStrategy         = require('passport-local'),
      passportLocalMongoose = require('passport-local-mongoose'),
      Post                  = require('./models/post'),
      User                  = require('./models/user'),
      seedDB                = require('./seeds');

const postRoutes            = require('./routes/posts'),
      indexRoutes           = require('./routes/index');

// Variables
app.locals.errMsg = app.locals.errMsg || null;

// App Config
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog_app', {
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(flash());
//seedDB();

// Passport Configuration
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

// Getting current user in all templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success')
    next();
});

app.use(indexRoutes);
app.use(postRoutes);

app.listen(process.env.PORT || 3000, () => console.log("Blogging App is running at port 3000!"));