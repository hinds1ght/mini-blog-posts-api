
const prisma = require('../model/model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

//REGISTER*******************

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

// LOGIN**********************

exports.login = (req, res)=>{
    res.send('login')
}

// POSTS*******************

exports.posts = (req, res)=>{
    res.send('posts')
}
