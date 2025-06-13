const jwt = require('jsonwebtoken')

const generateToken = (user) =>{
    const accessToken = jwt.sign({ id: user.id},  process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
    const refreshToken = jwt.sign({ id: user.id},  process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
    
    return {accessToken, refreshToken};
}

module.exports = generateToken;