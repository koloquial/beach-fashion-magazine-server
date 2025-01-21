const express = require('express');
const cors = require('cors');
const path = require('path');

const january2025 = require('./articles/2025/january/index.js');
const authors = require('./authors/index.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve images



// Route: Get all articles
app.get('/articles', (req, res) => {
  res.json(january2025);
});

// Route: Get all authors
app.get('/authors', (req, res) => {
    res.json(authors);
  });

// Route: Get a specific article by ID
app.get('/articles/:slug', (req, res) => {
    const { slug } = req.params;

    let article;

    for(let i = 0; i < january2025.length; i++){
        let string = january2025[i].title.toLowerCase().replace(/\s+/g, '-');

        if(string === slug){
            article = january2025[i];
        }
    }
  
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
  
    res.json(article);
  });

  // Route: Get a specific music article
app.get('/music/:slug', (req, res) => {
    const { slug } = req.params;

    let article;

    for(let i = 0; i < january2025.length; i++){
        let string = january2025[i].title.toLowerCase().replace(/\s+/g, '-');

        if(string === slug){
            article = january2025[i];
        }
    }
  
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
  
    res.json(article);
  });

  // Route: Get a specific author
app.get('/authors/:slug', (req, res) => {
    const { slug } = req.params;

    let author;

    for(let i = 0; i < authors.length; i++){
        let string = authors[i].name.toLowerCase().replace(/\s+/g, '-');

        if(string === slug){
            author = authors[i];
        }
    }
  
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
  
    res.json(author);
  });

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
