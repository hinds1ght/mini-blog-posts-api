const jwt = require('jsonwebtoken')

const generateToken = (user) =>{
    const accessToken = jwt.sign({ id: user.id},  process.env.ACCESS_TOKEN_SECRET)
    //console.log(accessToken)
    return {accessToken};
}

module.exports = generateToken;