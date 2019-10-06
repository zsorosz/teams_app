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

    var A0 = [0, 5, 5, 5, 5, 5, 0];
    var A1 = [0, 1, 1, 3, 3, 0, 1];
    var B1 = [1, 0, 3, 2, 2, 2, 0];
    var A2 = [0, 2, 2, 3, 3, 0, 2];
    var B2 = [2, 0, 3, 1, 1, 1, 0];

    var planA0 = [A0, A0, A0, A0, A0, A0];
    var planA1 = [A1, B1, A1, B1, A1, B1];
    var planB1 = [B1, A1, B1, A1, B1, A1];
    var planA2 = [A2, B2, A2, B2, A2, B2];
    var planB2 = [B2, A2, B2, A2, B2, A2];

    var monthA0 = [];
    var monthA1 = [];
    var monthA2 = [];
    var monthB1 = [];
    var monthB2 = [];

    planA0.forEach(function(week){
        week.forEach(function(day){
            monthA0.push(day);
        });
    });
    planA1.forEach(function(week){
        week.forEach(function(day){
            monthA1.push(day);
        });
    });
    planA2.forEach(function(week){
        week.forEach(function(day){
            monthA2.push(day);
        });
    });
    planB1.forEach(function(week){
        week.forEach(function(day){
            monthB1.push(day);
        });
    });
    planB2.forEach(function(week){
        week.forEach(function(day){
            monthB2.push(day);
        });
    });

    var editorPlans = [monthA1, monthB1, monthA2, monthB2];

    Team.findById(req.params.id).populate("members").exec(function(err, foundTeam){
        if(err){
            //req.flash("error", "Team not found");
            res.redirect("back");
        } else{
            //render show template with that team
            res.render("plan/show", {team: foundTeam, dates: dates, days: days, firstDayOfMonth: firstDayOfMonth, monthA0: monthA0, monthA1: monthA1, monthB1, monthB1, monthA2: monthA2, monthB2: monthB2});
        }
    });
});

module.exports = router;