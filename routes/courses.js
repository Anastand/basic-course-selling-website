const express = require('express');
const crouter = express.Router(); // Create a router instance

crouter.post('/purchases', (req, res) => {
  res.json({
    msg: "hello"
  });
});

crouter.get('/preview', (req, res) => {
  res.json({ msg: 'hello from preview' });
});

module.exports = crouter; // Export the router