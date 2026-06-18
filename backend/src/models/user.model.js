const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,"username is required"],
        unique:[true,"username must be unique"]
    },
    email:{
        type:String,
        require:[true,"email is required"],
        unique:[true,"email must be unique"]
    },
    password:{
        type:String,
        require:[true,"password is required"],
        select:false
    }
})

const userModel = mongoose.model("users",userSchema);

module.exports=userModel