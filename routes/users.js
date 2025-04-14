const express = require('express');
const urouter = express.Router(); // Simplified to just 'urouter'

// Define routes
urouter.post('/signin', (req, res) => {
  res.json({ msg: 'hello from signin' }); // Fixed typo in message
});

urouter.get('/purchases', (req, res) => {
  res.json({ msg: 'hello from purchases' });
});

urouter.post('/signup', (req, res) => {
  res.json({ msg: 'hello from signup' });
});

// Export the router
module.exports = urouter; // Simplified export