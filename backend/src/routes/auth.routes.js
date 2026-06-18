const {Router} = require("express");
const { registerUser, loginUser, getMe, logoutUser } = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const router = Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/get-me",identifyUser,getMe)
router.post("/logout",logoutUser)

module.exports=router