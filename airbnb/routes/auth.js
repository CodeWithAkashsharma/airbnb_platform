const express = require("express");
const authRoute =  express.Router();

const authController = require('../Controllers/authController');

authRoute.get("/login",authController.getLogin);
authRoute.post("/login",authController.postLogin);
authRoute.post("/logout",authController.postLogout);
authRoute.get("/signup",authController.getSignup);
authRoute.post("/signup",authController.postSignup);





module.exports=authRoute;
