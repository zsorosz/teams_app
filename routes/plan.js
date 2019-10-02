var express = require("express");
var router = express.Router();
var middleware = require("../middleware");
var Team = require("../models/team");

//SHOW Shift Plan
router.get("/", function(req, res){
    Team.findById(req.params.id, function(err, foundTeam){
        if(err){
            //req.flash("error", "Team not found");
            res.redirect("back");
        } else{
            //render show template with that team
            res.render("teams/plan/show", {team: foundTeam});
        }
    });
});

module.exports = router;