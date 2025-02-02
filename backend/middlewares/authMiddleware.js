const jwt=require('jsonwebtoken')
const expressAsyncHandler = require("express-async-handler");
const User=require('../models/userModel')

const verifyUser=expressAsyncHandler(async(req,res,next)=>{
//format of token= Bearer token ( hence we spilt to get the exact token)
    const token=req.headers.authorization?.split(' ')[1];
console.log(token);
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        // res.send(decoded);
        req.user=await User.findById(decoded.id)
        if(!req.user){
            res.status(404).send('User not found');
        }
        next()
    }catch(error){
        res.status(401).send(error.message)
        // throw new Error('Not authorized, please login')
    }
})

module.exports={verifyUser}