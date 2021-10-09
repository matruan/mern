const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = {
    verifyToken
}

function verifyToken(req, res, next){
  const token = req.headers['x-access-token']
  if(token === undefined || token === null || token === ""){
      return res.json({
          status: false,
          message: "You don't have access to this data"
      })
  }
  const auth = jwt.verify(token,process.env.SECURE_KEY);
  if(!auth){
      return res.json({
          status: false,
          message: "You don't have access to this data"
      })
  }

  req.userID = auth;

  next();
}

module.exports = verify;