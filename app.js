import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

// Get directory name in ESM (replacement for __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // For PUT and DELETE methods
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// In-memory storage for blog posts
let posts = [];
let nextId = 1;

// Routes
// Home page - Display all posts
app.get('/', (req, res) => {
  res.render('home', { posts });
});

// Form to create a new post
app.get('/posts/new', (req, res) => {
  res.render('create');
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: nextId++,
    title,
    content,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.redirect('/');
});

// View a specific post
app.get('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  res.render('post', { post });
});

// Form to edit a post
app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  res.render('edit', { post });
});

// Update a post
app.put('/posts/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send('Post not found');
  
  post.title = req.body.title;
  post.content = req.body.content;
  
  res.redirect('/');
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
  const postIndex = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (postIndex === -1) return res.status(404).send('Post not found');
  
  posts.splice(postIndex, 1);
  res.redirect('/');
});

// Start the server
app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});