const jwt = require('jsonwebtoken')

const generateToken = (user) =>{
    const accessToken = jwt.sign({ id: user.id},  process.env.ACCESS_TOKEN_SECRET)
    const refreshToken = jwt.sign({ id: user.id},  process.env.REFRESH_TOKEN_SECRET)
    
    return {accessToken, refreshToken};
}

module.exports = generateToken;