const express = require('express');
const user = require('../controllers/controllers')
const route = express.Router();

route.post('/register', user.register)
route.post('/login', user.login)
route.get('/posts', user.posts)

module.exports = route;