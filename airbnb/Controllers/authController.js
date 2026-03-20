const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res) => {
  res.render("auth/login", {
    Title: "Login",
    error: [],
    oldInput: { email: "" },
  });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      Title: "Login",
      error: ["User not found"],
      oldInput: { email },
    });
  }

  const doMatch = await bcrypt.compare(password, user.password);
  if (!doMatch) {
    return res.status(422).render("auth/login", {
      Title: "Login",
      error: ["Incorrect password"],
      oldInput: { email },
    });
  }

req.session.isLoggedIn = true;
req.session.user = {
  _id: user._id.toString(),
  email: user.email,
  usertype: user.usertype
};

req.session.save(err => {
  if (err) {
    console.log("SESSION SAVE ERROR:", err);
    return next(err);
  }
  res.redirect("/");
});

};

exports.postLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};

exports.getSignup = (req, res) => {
  res.render("auth/signup", {
    Title: "Signup",
    
    error: [],
    oldInput: {
      firstname: "",
      lastname: "",
      email: "",
      usertype: "",
    },
  });
};

exports.postSignup = [
  check("firstname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("First name must be at least 3 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First name must contain only alphabets"),

  check("lastname")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Last name must be at least 3 characters long")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last name must contain only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain a lowercase letter")
    .matches(/[@$#_&]/)
    .withMessage("Password must contain a special character"),

  check("confirmpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),

  check("usertype")
    .isIn(["host", "user"])
    .withMessage("Invalid user type"),

  check("termCondition")
    .equals("on")
    .withMessage("You must accept the terms and conditions"),

  async (req, res) => {
    const errors = validationResult(req);
    const { firstname, lastname, email, password, usertype } = req.body;

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        Title: "Signup",
    
        error: errors.array().map((e) => e.msg),
        oldInput: { firstname, lastname, email, usertype },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      usertype,
    });

    await user.save();
    res.redirect("/login");
  },
];
