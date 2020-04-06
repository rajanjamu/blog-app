const express       = require('express'),
      mongoose      = require('mongoose'),
      bodyParser    = require('body-parser'),
      app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.listen(3000, () => console.log("Blogging App is running at port 3000!"));

mongoose.connect('mongodb://localhost/blog_app', {
   useNewUrlParser: true,
   useUnifiedTopology: true
});

const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
});
const Post = mongoose.model('Post', postSchema);

// ROOT
app.get('/', (req, res) => {
    res.send('ROOT Page');
});

// 1. INDEX
app.get('/posts', (req, res) => {
    res.send('INDEX Page');
});

// 2. NEW
app.get('/posts/new', (req, res) => {
    res.send('NEW Page');
});

// 3. SHOW
app.get('/posts/:id', (req, res) => {
    res.send('SHOW Page');
});

// 4. CREATE
app.post('/posts', (req, res) => {
    res.send('CREATE POST');
});

// 5. EDIT
app.get('/posts/:id/edit', (req, res) => {
    res.send('EDIT Page');
});

// 6. UPDATE
app.put('/posts/:id', (req, res) => {
    res.send('UPDATE PUT');
});

// 7. DELETE
app.delete('/posts/:id', (req, res) => {
    res.send('DELETE Post');
});