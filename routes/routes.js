const express = require('express');
const user = require('../controllers/controllers');
const verifyToken = require('../auth/verifyToken');
const route = express.Router();

route.post('/register', user.register)
route.post('/login', user.login)
route.get('/posts', verifyToken , user.posts)

module.exports = route;