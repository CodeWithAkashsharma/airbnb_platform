const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const {hostRoute} = require("./routes/host");
const userRoute = require("./routes/user");
const authRouter = require("./routes/auth");
const { error } = require("./Controllers/404");
const app = express();
require("dotenv").config();
const path = require("path");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(multer(multerOptions).single('image'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/host/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/homes/uploads", express.static(path.join(__dirname, "uploads")));



const store = new mongodbStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});
// store.on("error", (error) => {
//   console.log("Session store error:", error);
// });


app.use(
  session({
    secret: process.env.SESSION_SECRET,
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


const port = process.env.PORT ||6789

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
  });
});
