const home = require("../models/home");

exports.getAddhome = (req, res, next) => {
  res.render("host/add-home", {
    Title: "Add-Home",

  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  home.findById(homeId).then((home) => {
    if (!home) {
      console.log("not found home");
      return res.redirect("/host/host-homes-list");
    }

    res.render("host/edit-home", {
      Title: "Add-Home",
      editing: editing,
      home: home,

    });
  });
};

exports.postAddhome = (req, res, next) => {
  const { homeName, price, location, rating, image, description } = req.body;

  const Home = new home({
    homeName,
    price,
    location,
    rating,
    image,
    description,
  });

  Home.save().then(() => {
    console.log("home saved successfully");
    res.redirect("/host/homes-list");
  });
};

exports.postEditHome = (req, res, next) => {
  const { _id, homeName, price, location, rating, image, description } =
    req.body;

  home.findById(_id).then((home) => {
    home.homeName = homeName;
    home.price = price;
    home.location = location;
    home.rating = rating;
    home.image = image;
    home.description = description;

    home.save().then(() => {
      res.redirect("/host/homes-list");
    });
  });
};

exports.getHostHomes = (req, res, next) => {
  home.find().then((body) => {
    res.render("host/host-list", {  
      body: body,
      Title: "Airbnb : Host-homesList",
    
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  home.findByIdAndDelete(homeId).then(() => {
    res.redirect("/host/host-homes-list");
  });
};
