const express = require("express");
const userRoute =  express.Router();
const { gethome } = require("../Controllers/userController");
const { getBooking } = require("../Controllers/userController");
const { getFavourite } = require("../Controllers/userController");
const { getHomeList} = require("../Controllers/userController");
const {getHomeDetail} = require("../Controllers/userController");
const {postfavourite} = require("../Controllers/userController");
const {pdf} = require("../Controllers/userController");

userRoute.get("/",gethome);
userRoute.get("/Homes-list",getHomeList);
userRoute.get('/booking',getBooking);
userRoute.get('/favourite-list',getFavourite);
userRoute.get('/homes/:homeId',getHomeDetail);
userRoute.post('/favourite/:homeId',postfavourite);
userRoute.post('/delete-favourite/:homeId',pdf);


module.exports=userRoute;
