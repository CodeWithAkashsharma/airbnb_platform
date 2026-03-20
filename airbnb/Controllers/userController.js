const User = require("../models/user");
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

exports.getFavourite = async(req, res, next) => {

  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');
   res.render("user/Favourite-list", {
        favouriteHomes: user.favourites,
        Title: "My Favourite",
       
      });
};

exports.postfavourite = async (req, res, next) => {
  const houseId = req.params.homeId;
  const userId = req.session.user._id;

  await User.findByIdAndUpdate(userId, {
    $addToSet: { favourites: houseId }
  });

  res.redirect("/favourite-list");
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

exports.pdf = async (req, res, next) => {
  const houseId = req.params.homeId;
const userId = req.session.user._id;
  const user =await User.findById(userId);
  if(user.favourites.includes(houseId)){

    user.favourites = user.favourites.filter(fav=>fav.toString() != houseId );
  await user.save();
  }
 
    res.redirect("/favourite-list");
    
};
