const express = require('express');
const route = express.Router();

route.post('/register', (req, res)=>res.send('register'))
route.post('/login', (req, res)=>res.send('login'))
route.get('/posts', (req, res)=>res.send('posts'))

module.exports = route;