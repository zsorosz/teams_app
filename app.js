var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash"),
    Team            = require("./models/team"),
    Member          = require("./models/member"),
    User            = require("./models/user"),
    seedDB          = require("./seed"),

    // requiring routes
    teamsRoutes         = require("./routes/teams"),
    membersRoutes       = require("./routes/members"),
    indexRoutes         = require("./routes/index")

mongoose.connect('mongodb://localhost/teamsapp', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();


app.use("/", indexRoutes);
app.use("/teams", teamsRoutes);
app.use("/teams/:id/members", membersRoutes);

// PASSPORT CONFIG
app.use(require("express-session")({
  secret: "Unstoppable Ninja Cseppke!",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
});
