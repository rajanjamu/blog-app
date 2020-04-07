const methodOverride    = require('method-override'),
      bodyParser        = require('body-parser'),
      mongoose          = require('mongoose'),
      express           = require('express'),
      app               = express(),
      Post              = require('./models/post.js'),
      seedDB            = require('./seeds');

// App Config
//seedDB();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Connect to the Mongo Database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/blog_app', {
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true
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
app.get('/posts/new', (req, res) => {
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
app.get('/posts/:id/edit', (req, res) => {
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

// Rest of the routes
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, () => console.log("Blogging App is running at port 3000!"));