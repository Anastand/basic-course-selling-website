const express = require("express");
const arouter = express.Router();

arouter.post('/signin', (req, res) => {
  res.json({ msg: 'hello from signin admin' }); // Fixed typo in message
});

arouter.post('/signup', (req, res) => {
  res.json({ msg: 'hello from signup admin' });
});

arouter.get('/createCourse', (req, res) => {
  res.json({ msg: 'hello from create course admin' });
});

module.exports = arouter;