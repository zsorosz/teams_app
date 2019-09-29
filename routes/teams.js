var express = require("express");
var router = express.Router();
var Team = require("../models/team");

//INDEX - show all teams
router.get("/", function(req, res){
        Team.find({}, function(err, allTeams){
            if(err){
                console.log(err);
            } else{
                res.render("teams/index", {teams: allTeams});
            }
        });
});

// NEW - show form to create new team
router.get("/new", function(req, res){
    res.render("teams/new.ejs");
});

//CREATE - add new team to DB
router.post("/", function(req, res){
    var country = req.body.country;
    var image = req.body.image;
    var teamlead = req.body.teamlead;
    var countrycode = req.body.countrycode;
    var newTeam = {country: country, image: image, teamlead: teamlead, countrycode: countrycode};
    // Create a new team and save to DB
    Team.create(newTeam, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to teams page
            console.log(newlyCreated);
            res.redirect("/teams");
        }
    });
});

module.exports = router;