const prisma = require('../model/model');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const generateToken = require('../auth/generateToken');

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

exports.login = asyncHandler(async (req, res)=>{
    const { email, password} = req.body;

    const user = await prisma.user.findUnique({where: {email}})
    if (!user || !(await bcrypt.compare(password, user.password))){
        return res.status(400).json({message: 'Invalid Credentials'})
    }

    const { accessToken } = generateToken(user);

    res.json({token: accessToken,
                user: {id: user.id}
            });
})

// POSTS*******************

exports.posts = (req, res)=>{
    res.send('posts!!!!')
}
