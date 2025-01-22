const express = require('express');
const cors = require('cors');
const path = require('path');

const january2025 = require('../articles/2025/january/index.js');
const authors = require('../authors/index.js');

const app = express();

// Middleware
app.use(cors({ origin: "https://beach-fashion-magazine.vercel.app" }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve images

// Helper function to generate a slug from a string
const generateSlug = (str) => str.toLowerCase().replace(/\s+/g, '-');

// Helper function to find an item by slug
const findBySlug = (items, slug) => items.find((item) => generateSlug(item.title || item.name) === slug);

// Generic route handler for articles
const handleArticleRoute = (req, res, category) => {
  const { slug } = req.params;
  const article = findBySlug(january2025, slug);

  console.log('Article:', article);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json(article);
};

// Generic route handler for authors
const handleAuthorRoute = (req, res) => {
  const { slug } = req.params;
  const author = findBySlug(authors, slug);

  if (!author) {
    return res.status(404).json({ error: 'Author not found' });
  }

  res.json(author);
};

// Route: Get all articles
app.get('/articles', (req, res) => {
  res.json(january2025);
});

// Route: Get all authors
app.get('/authors', (req, res) => {
  res.json(authors);
});

// Dynamic article category routes
const categories = [
  'music',
  'interview',
  'adventure',
  'horoscope',
  'gossip',
  'romance',
  'drama',
  'movie',
  'love',
  'rumor',
  'quiz',
  'reflection'
];

categories.forEach((category) => {
  app.get(`/${category}/:slug`, (req, res) => handleArticleRoute(req, res, category));
});

// Route: Get a specific author
app.get('/authors/:slug', handleAuthorRoute);

// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

module.exports = app;