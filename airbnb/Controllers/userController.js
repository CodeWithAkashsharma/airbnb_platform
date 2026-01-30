const favourite = require("../models/favourite");
const home = require("../models/home");

exports.gethome = (req, res, next) => {
  home.find().then((body) => {
    res.render("user/home", {
      body: body,
      Title: "Airbnb-Home",
     
    });
  });
};

exports.getHomeList = (req, res, next) => {
  home.find().then((body) => {
    res.render("user/Homes-list", {
      body: body,
      Title: "Airbnb-Home-list",
   
    });
  });
};

exports.getBooking = (req, res, next) => {
  res.render("user/booking", {
    Title: "My Booking",
   
  });
};

exports.getFavourite = (req, res, next) => {
  favourite
    .find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);

      res.render("user/Favourite-list", {
        favouriteHomes: favouriteHomes,
        Title: "My Favourite",
       
      });
    });
};

exports.postfavourite = (req, res, next) => {
  const houseId = req.params.homeId;

  favourite.findOne({ houseId: houseId }).then((fav) => {
    if (!fav) {
      const newFav = new favourite({ houseId: houseId });
      newFav.save();
    }
  }).then(() => {
    res.redirect("/favourite-list");
  });
};

exports.getHomeDetail = (req, res, next) => {
  const homeId = req.params.homeId;

  home.findById(homeId).then((home) => {
    if (!home) {
      res.redirect("/Homes-list");
    } else {
      res.render("user/home-detail", {
        home: home,
        Title: "Home-Detail",
      
      });
    }
  });
};

exports.pdf = (req, res, next) => {
  const houseId = req.params.homeId;

  favourite
    .findOneAndDelete({ houseId: houseId })
    .finally(() => {
      res.redirect("/favourite-list");
    });
};
