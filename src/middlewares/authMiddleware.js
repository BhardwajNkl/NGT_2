const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig')

const getTokenFromHeader = (req) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    return authorizationHeader.substring(7); // Extract the token
  }
  return null;
};

const verifyToken = (req, res, next) => {
  const token = getTokenFromHeader(req) || req.cookies.accessToken;
 
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.decoded = decoded; // Store the decoded token in req.decoded
    console.log('c',req.decoded.username)
    next();
  });
};

module.exports = { verifyToken }