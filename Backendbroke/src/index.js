const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, welcome to my server!');
});

// Another example route
app.get('/api/test', (req, res) => {
  res.json({ message: 'This is a test route' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
