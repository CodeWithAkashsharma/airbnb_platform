const express = require("express");
const hostRoute= express.Router();
const {getAddhome} = require("../Controllers/hostController");
const {postAddhome} = require("../Controllers/hostController");
const {getHostHomes} = require("../Controllers/hostController");
const {getEditHome} = require("../Controllers/hostController");
const {postEditHome} = require("../Controllers/hostController");
const {postDeleteHome} = require("../Controllers/hostController");



hostRoute.get("/add-home",getAddhome);
hostRoute.post("/add-home",postAddhome);
hostRoute.get("/homes-list",getHostHomes);
hostRoute.get("/edit-home/:homeId",getEditHome);
hostRoute.post("/edit-home",postEditHome);
hostRoute.post("/delete-home/:homeId",postDeleteHome);



exports.hostRoute=hostRoute;
