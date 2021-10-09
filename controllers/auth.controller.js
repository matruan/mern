const authMethods = {}
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

authMethods.signup = async(req,res) => {
   const { username, password } = req.body;

   const newUser = new userModel({
       username, password
   });

   newUser.password = await newUser.encryptPassword(password);

   newUser.save();

   return res.json({status: true, message: "User registered succesfully" });
}

authMethods.signin = async(req, res) => {
    const { username, password } = req.body;
     
    console.log(username);
    console.log(password);

    const user = await userModel.findOne({username: username});

    if(!user){
        return res.json({
            auth: false,
            message: 'Username or password incorrect'
        })
    }

    const authenticated = user.confirmPassword(password);
    if (!authenticated){
        return res.json({
            auth: false,
            message: 'Username or password incorrect'
        })
    }

    const token = jwt.sign(user._id.toString(), process.env.SECURE_KEY);
    if(!token){
        return res.json({
            auth: false,
            message: 'There was a problem, try again'
        })
    }

    return res.json({
        auth: true,
        token: token
    })
}

module.exports = authMethods;