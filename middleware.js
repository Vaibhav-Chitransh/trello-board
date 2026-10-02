const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers.token;
    if(!token) return res.status(403).json({message: "You are not logged in"});

    const decoded = jwt.verify(token, "SECRET123");
    const userId = decoded.userId;

    if(!userId) return res.status(403).json({message: 'malformed token'});

    req.userId = userId;
    next();
}

module.exports = {
    authMiddleware
}