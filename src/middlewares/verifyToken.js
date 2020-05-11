const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const token = req.headers.authorization;
    let decoded

    if(!token){
        return res.status(401).json({
            auth: false,
            message: 'No token provided.'
        });
    }

    const resulttoken = token.split(' ');

    try {
        decoded = jwt.verify(resulttoken[1], process.env.mysecretkeyjwt);
    } catch (error) {
        return res.status(400).json({error})
    }
    
    next();
}

module.exports = verifyToken;