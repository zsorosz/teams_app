var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy   = require("passport-local");
var User = require("../models/user");

// PASSPORT CONFIG
router.use(require("express-session")({
    secret: "Unstoppable Ninja Cseppke!",
    resave: false,
    saveUninitialized: false
  }));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
  
router.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


//Root route
router.get("/", function(req, res){
    res.render("landing");
});

//================
// AUTH ROUTES
//================

// show register form
router.get("/register", function(req, res){
    res.render("register");
});
// handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    //eval(require('locus'));
    if(req.body.adminCode === "secretcode123"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //req.flash("error", err.message);
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            //req.flash("success", "Welcome to TeamsApp " + user.username);
            res.redirect("/teams");
        });
    });
});

// show login form
router.get("/login", function(req, res){
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/teams",
    failureRedirect: "/login"
}), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    //req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;