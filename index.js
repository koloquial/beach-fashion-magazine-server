const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;

const january2025 = require('./articles/2025/january/index.js');
const authors = require('./authors/index.js');

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Serve images

// Helper function to generate a slug from a string
const generateSlug = (str) => str.toLowerCase().replace(/\s+/g, '-');

// Helper function to find an item by slug
const findBySlug = (items, slug) => {
  return items.find((item) => {
    const name = item.Identity?.Name || item.name; // Check for the nested structure
    return generateSlug(name) === slug;
  });
};

// Route: Default (browser-accessible)
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Beach Fashion Magazine API</title>
      </head>
      <body>
        <h1>Welcome to the Beach Fashion Magazine API</h1>
        <p>Use the following endpoints to access the API:</p>
        <ul>
          <li><a href="/articles">/articles</a> - List all articles</li>
          <li><a href="/authors">/authors</a> - List all authors</li>
          <li><code>/{category}/:slug</code> - Get a specific article by category and slug</li>
          <li><code>/authors/:slug</code> - Get a specific author by slug</li>
        </ul>
        <p>For more information, visit our <a href="https://beach-fashion-magazine.vercel.app">website</a>.</p>
      </body>
    </html>
  `);
});

// Generic route handler for articles
const handleArticleRoute = (req, res, category) => {
  const { slug } = req.params;
  const article = findBySlug(january2025, slug);

  if (!article) {
    return res.status(404).json({ error: 'Article not found' });
  }

  res.json(article);
};

// Route: Get a specific author
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

// Route: Get a specific author by slug
app.get('/authors/:slug', handleAuthorRoute);

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

// // Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});