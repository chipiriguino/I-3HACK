var express = require("express");
var router = express.Router();
const withAuth = require("../helpers/middleware");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const bcrypt = require("bcryptjs");
const { findOne } = require("../models/user");
const bcryptSalt = 10;


//SIGN UP

router.get("/signup", function (req, res, next) {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  if (req.body.email === "" || req.body.password === "") {
    res.render("auth/signup", {
      errorMessage: "Indicate a username and a password to sign up",
    });
    return;
  }

  const { fullname, password, birthdate, gender, email, description, photo } = req.body;

  const salt = await bcrypt.genSaltSync(10);
  const hashPass = await bcrypt.hashSync(password, salt);

  try {
    const user = await User.findOne({ email: email });
    if (user !== null) {
      res.render("auth/signup", {
        errorMessage: "The email already exists!",
      });
      return;
    }

    await User.create({
      fullname,
      password: hashPass,
      birthdate,
      gender,
      email,
      description,
      photo,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});


//LOG IN + TOKEN VALIDATION (MIDDLEWARE ALSO INVOLVED)


router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  if (req.body.email === "" || req.body.password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to sign up.",
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.render("auth/login", {
        errorMessage: "The email doesn't exist",
      });
      return;
    } else if (bcrypt.compareSync (password, user.password)) {
      const userWithoutPass = await User.findOne({ email }).select("-password");
      const payload = { userWithoutPass };
      const token = jwt.sign(payload, process.env.SECRET_SESSION, {
        expiresIn: "1h"
      });
      res.cookie("token", token, { httpOnly: true });
      res.status(200).redirect("/");
    } else {
      res.render("auth/login", {
        errorMessage: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect('/login')
  })
})

module.exports = router;
