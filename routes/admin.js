const express = require("express");
const arouter = express.Router();
const { adminModel } = require("../db");

arouter.post('/signin', (req, res) => {
  res.json({ msg: 'hello from signin admin' }); // Fixed typo in message
});

arouter.post('/signup', (req, res) => {
  res.json({ msg: 'hello from signup admin' });
});

arouter.post('/Course/create', (req, res) => {
  res.json({ msg: 'hello from create course admin' });
});
arouter.put('/Course/modify', (req, res) => {
  res.json({ msg: 'hello from moify course admin' });
});
arouter.get('/Courses/bulk', (req, res) => {
  res.json({ msg: 'hello from course bulk admin' });
});

module.exports = arouter;