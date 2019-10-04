var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");
var Team = require("../models/team");
var Member = require("../models/member");
var Plan = require("../models/plan");


//SHOW Shift Plan
router.get("/", function(req, res){
    var dates = [];
    var firstDayOfMonth;
    function getDaysInMonth(month, year) {
        var date = new Date(Date.UTC(year, month, 1));
        firstDayOfMonth = date.getDay();
        
        while (date.getMonth() === month) {
           dates.push(new Date(date));
           date.setDate(date.getDate() + 1);
        }
    };
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    getDaysInMonth(9, 2019);

    // var A1 = [0, 1, 1, 3, 3, 0, 2];
    // var B1 = [2, 0, 3, 2, 2, 2, 0];
    // var A2 = [0, 2, 2, 3, 3, 0, 1];
    // var B2 = [1, 0, 3, 1, 1, 1, 0];

    var plan1 = [0, 1, 1, 3, 3, 0, 2, 2, 0, 3, 2, 2, 2, 0, 0, 1, 1, 3, 3, 0, 2, 2, 0, 3, 2, 2, 2, 0, 0, 1, 1, 3, 3, 0, 2, 2, 0, 3, 2, 2, 2, 0];
    
    Team.findById(req.params.id).populate("members").exec(function(err, foundTeam){
        if(err){
            //req.flash("error", "Team not found");
            res.redirect("back");
        } else{
            //render show template with that team
            res.render("plan/show", {team: foundTeam, dates: dates, days: days, plan1: plan1, firstDayOfMonth: firstDayOfMonth});
        }
    });
});

module.exports = router;