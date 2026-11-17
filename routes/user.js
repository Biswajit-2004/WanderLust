const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const user = require("../models/user.js");

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  WrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("Success", "Welcome to Wanderlust");
        res.redirect("/listings");
      });
    } catch (err) {
      req.flash("error", err.message);
      res.redirect("/signup");
    }
  }),
);

//login route ---

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

// post login route---

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome Back to Wanderlust!");
    let user = await User.findById(req.user._id);
    let redirectUrl = res.locals.redirectUrl;
    if(!redirectUrl){
    if (user.role === "customer"){
         redirectUrl = "/customer/home";
    } else {
     redirectUrl = "/listings";
    
  }}
  return res.redirect(redirectUrl);
},
);

//logout route ----

router.get("/logout", (req, res, next) => {
  let userRole = req.user ? req.user.role : null;
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out!");
    if(userRole == "customer"){
  res.redirect("/customer/home");
    } else{
      res.redirect("/listings");
    }
  });
});

module.exports = router;
