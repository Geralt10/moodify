const redis = require("../config/cache");

const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken")
async function identifyUser(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"token not found"
        })
    }
    const isTokenBlacklisted = await redis.get(token);

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"invalid token"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next()
    } catch (err) {
        return res.status(401).json({
            message:'invalid token'
        })
    }
}

module.exports=identifyUser