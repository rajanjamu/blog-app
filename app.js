const bodyParser    = require('body-parser'),
      mongoose      = require('mongoose'),
      express       = require('express'),
      app           = express();

// App Config
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Connect to the Mongo Database
mongoose.connect('mongodb://localhost/blog_app', {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

// Declare the DB Schema
var postSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});
var ObjectId = mongoose.Types.ObjectId;
var Post = mongoose.model('Post', postSchema);
module.exports = Post;

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

// 4. CREATE
app.post('/posts', (req, res) => {
    console.log(req.body);
    Post.create(req.body, (err, createdPost) => {
        if (err) console.log(err);
        else {
            res.json(createdPost);
            // res.redirect(`/posts/${createdPost._id}`);
            // res.end();
        }
        // else console.log(createdPost._id);
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
    console.log("Hello");
    let updatePost = {
        title: req.body.title,
        image: req.body.image,
        body: req.body.body
    }
    console.log(updatePost);
    Post.findByIdAndUpdate(req.params.id, updatePost, (err, updatedPost) => {
        if (err) console.log(err);
        else res.redirect(`/posts/${updatedPost._id}`);
    });
});

// 7. DELETE
app.delete('/posts/:id', (req, res) => {
    res.send('DELETE Post');
});

// 3. SHOW
app.get('/posts/:id', (req, res) => {
    console.log('SHOW', req.params.id);
    var id = new ObjectId(req.params.id);

    console.log('new id', id);

    Post.findById(id, (err, foundPost) => {
        if (err) console.log('Error', err);
        else res.render('show', { post: foundPost });
    });
    // console.log('showPost', );req.app.get('id')
});

app.listen(3000, () => console.log("Blogging App is running at port 3000!"));