require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true                
  }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const router = require('./routes/routes');

app.use('/api', router);

const PORT = process.env.PORT || 2025;
app.listen(PORT, ()=> console.log(`Server up on port: ${PORT}`));

