require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true                // allow credentials (cookies, auth headers)
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const router = require('./routes/routes');

app.use('/api', router);

app.listen(2025, ()=> console.log('Server up'));