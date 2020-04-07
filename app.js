const methodOverride    = require('method-override'),
      bodyParser        = require('body-parser'),
      mongoose          = require('mongoose'),
      express           = require('express'),
      app               = express();
      Post              = require('./models/post.js')

// App Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');

// Connect to the Mongo Database
mongoose.connect('mongodb://localhost/blog_app', {
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true
});

// Creating a sample post in DB
// Post.create({
//     title: "My First Blog",
//     image: "https://cdn.dribbble.com/users/269922/screenshots/1008644/files.jpg",
//     body: "This is my first blog. I am excited to be building this app as I have always been wanting to do it and never had courage, thinking about the mountains of workload that it will result into. Corona perios is forutnately or unfortunately a great time!"
// }, (err, post) => {
//     if (err) console.log(err);
//     else console.log(post);
// });

// ROOT
app.get('/', (req, res) => {
    res.redirect('/posts');
});

// ------------ RESTFUL ROUTES ------------
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

app.listen(3000, () => console.log("Blogging App is running at port 3000!"));