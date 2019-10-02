var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Team = require("../models/team");

//SHOW Shift Plan
router.get("/", function(req, res){
    console.log(req.params);
    Team.findById(req.params.id).populate("members").exec(function(err, foundTeam){
        if(err){
            //req.flash("error", "Team not found");
            res.redirect("back");
        } else{
            //render show template with that team
            console.log(req.params.id);
            res.render("teams/plan/show", {team: foundTeam});
        }
    });
});

module.exports = router;