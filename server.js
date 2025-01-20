const express = require('express');
const cors = require('cors');
const path = require('path');

const article1 = require('./articles/2025/january/article1.json'); // Import articles data

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve images

// Route: Get all articles
app.get('/articles', (req, res) => {
  res.json(articles);
});

// Route: Get a specific article by ID
app.get('/articles/:slug', (req, res) => {
    const { slug } = req.params;
  
    let article = article1;
  
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
  
    res.json(article);
  });

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
