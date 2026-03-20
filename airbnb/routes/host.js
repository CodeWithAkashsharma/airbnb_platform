const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const upload = multer({ storage });





const express = require("express");
const hostRoute= express.Router();
const {getAddhome} = require("../Controllers/hostController");
const {postAddhome} = require("../Controllers/hostController");
const {getHostHomes} = require("../Controllers/hostController");
const {getEditHome} = require("../Controllers/hostController");
const {postEditHome} = require("../Controllers/hostController");
const {postDeleteHome} = require("../Controllers/hostController");




hostRoute.get("/add-home",getAddhome);
// hostRoute.post("/add-home",postAddhome);
hostRoute.post("/add-home", upload.single("image"), postAddhome);
hostRoute.get("/homes-list",getHostHomes);
hostRoute.get("/edit-home/:homeId",getEditHome);
// hostRoute.post("/edit-home",postEditHome);
hostRoute.post("/edit-home", upload.single("image"), postEditHome);
hostRoute.post("/delete-home/:homeId",postDeleteHome);




exports.hostRoute=hostRoute;
