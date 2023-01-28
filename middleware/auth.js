const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {


    // get token from header
    const token = req.header('x-auth-token');

    //check if no token found
    if(!token) {
        return res.status(401).json({msg: "No token, authorization denied"});
    }
    
    try {
        let decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        console.log(error.message);
        res.status(401).send({msg: "Token is not valid"});
    }

}