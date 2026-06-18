const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const redis = require("../config/cache");

async function registerUser(req,res){
   const {username,email,password}=req.body;
   const isUserAlreadyExist = await userModel.findOne({
    $or:[{username},{email}]
   })
   if(isUserAlreadyExist){
    return res.status(401).json({
        message:"invalid credentials"
    })
   }
   hashedPassword =await bcrypt.hash(password,10);

   const user = await userModel.create({
    username:username,
    email:email,
    password:hashedPassword
   })

   const token = jwt.sign({
    id:user._id,
   },process.env.JWT_SECRET,{expiresIn:"1hr"});

   res.cookie("token",token);

   return res.status(201).json({
    message:"user registered",
    user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
   })

}

async function loginUser(req,res){
    const{username,email,password}=req.body;
    const user = await userModel.findOne({
        $or:[
            {username},{email}
        ]
    }).select("+password");
    if(!user){
        return res.status(401).json({
            message:"invalid credentials"
        })
    }
    isMatchPassword = await bcrypt.compare(password,user.password);
    if(!isMatchPassword){
        return res.status(401).json({
            message:"unauthorized access"
        })
    }
    const token = jwt.sign({
        id:user._id,
        username:username
    },process.env.JWT_SECRET,{expiresIn:"1hr"});

    res.cookie("token",token);

    return res.status(200).json({
        message:"you are loggedIn successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

async function getMe(req,res){
    const user = await userModel.findById(req.user.id);

    return res.status(200).json({
        message:"user data fetched",
        user
    })
}

async function logoutUser(req,res) {
    const token = req.cookies.token;

    res.clearCookie("token",token);

    await redis.set(token,Date.now().toString(),"EX",60*60)

    res.status(200).json({
        message:"logout successfully"
    })
}

module.exports={registerUser,loginUser,getMe,logoutUser}