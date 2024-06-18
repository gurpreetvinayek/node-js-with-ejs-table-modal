// middlewares/authenticateToken.js
const jwt = require('jsonwebtoken');

const secretKey = 'sarewr23424erfe';


const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;  // Store user information from token in the request object
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = authenticateToken;