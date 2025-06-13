const jwt = require('jsonwebtoken')

const verifyToken =(req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]
    //console.log(token)

    if (!token){
        return res.status(401).json({ msg: "NO token"})
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        if(err) return res.status(403).json({msg: "unauthorized"})

        req.user = user;
        next();
    })
}

module.exports = verifyToken;