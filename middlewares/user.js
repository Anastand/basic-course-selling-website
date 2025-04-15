const jwt = require('jsonwebtoken');
const { JWT_USERS_PASSWORD } = require('../config');

function userMiddleware(req,res,next) {
  const token = req.headers.token;
  try {
    const verify = jwt.verify(token,JWT_USERS_PASSWORD);
    req.userID = verify.id;
    next()
  } catch (e) {
    res.send({msg:"error coudnt verify"})
  } 
};

module.exports = (userMiddleware);