const prisma = require('../model/model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const generateToken = require('../auth/generateToken');

// REGISTER**************************************************

exports.register = asyncHandler(async (req, res, next) => {
        const { email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            res.status(400);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            }
        });
            res.json(newUser)
});

// LOGIN*****************************************************

exports.login = asyncHandler(async (req, res)=>{
    const { email, password} = req.body;

    const user = await prisma.user.findUnique({where: {email}})
    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({message: 'Invalid Credentials'})
    }

    const { accessToken, refreshToken } = generateToken(user);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false, // true in production
        sameSite: 'Strict', // or 'Lax' depending on frontend/backend domains
        path: '/api/auth/refresh', // only sent to the refresh route
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

    res.json({token: accessToken,
                user: {id: user.id}
            });
})

// REFRESH TOKEN REQUEST*********************************

exports.refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, payload) => {
    if (err) {
      console.log("Invalid refresh token:", err.message);
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign(
      { id: payload.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15s' }
    );

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
      select: { id: true, email: true },
    });

    res.json({ accessToken, user });
  });
});

// LOGOUT******************************************

exports.logout = (req, res) => {
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      path: '/api/auth/refresh'
    });
  
    res.sendStatus(204);
  };  

// POSTS********************************

exports.posts = asyncHandler(async (req, res)=>{
    const data = await fetch("https://jsonplaceholder.typicode.com/posts") 
    const postList = await data.json();

    res.json(postList)
  })  
