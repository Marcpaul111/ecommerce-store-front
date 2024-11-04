const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // This allows cookies to be sent with the request
}));

// Your routes go here
app.get('/products', (req, res) => {
  // Your product fetching logic
});

app.listen(5000, () => console.log('Server running on port 5000'));