const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const {hostRoute} = require("./routes/host");
const userRoute = require("./routes/user");
const authRouter = require("./routes/auth");
const { error } = require("./Controllers/404");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const Db_PATH =
  "mongodb+srv://Root:airbnb123@cluster0.vzjocwm.mongodb.net/airbnb";

const store = new mongodbStore({
  uri: Db_PATH,
  collection: "session",
});

app.use(
  session({
    secret: "fsd",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.isLoggedIn || false;
  res.locals.user = req.session.user || null;
  next();
});

app.use("/host", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});

app.use(userRoute);
app.use("/host",hostRoute);
app.use(authRouter);
app.use(error);




mongoose.connect(Db_PATH).then(() => {
  app.listen(6789, () => {
    console.log("running on http://localhost:6789");
  });
});
