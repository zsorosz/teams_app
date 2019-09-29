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

module.exports = router;