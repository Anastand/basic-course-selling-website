const jwt = require('jsonwebtoken');
const JWT_ADMIN_PASSWORD =process.env.JWT_ADMIN_PASSWORD;

function adminMiddleware(req,res,next) {
  const token = req.headers.token;
  try {
    const verify = jwt.verify(token, JWT_ADMIN_PASSWORD);
    req.adminID = verify.id;
    next()
  } catch (e) {
    res.send({msg:"error coudnt verify"})
  } 
};

module.exports = adminMiddleware;