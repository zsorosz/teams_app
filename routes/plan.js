var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");
var Team = require("../models/team");
var Member = require("../models/member");
var Plan = require("../models/plan");

//INDEX - show all shiftplans
router.get("/", function(req, res){
    Team.findById(req.params.id).populate("plans").exec(function(err, team){
        if(err){
            console.log(err);
            res.redirect("back");
        } else {
            Plan.find({}, function(err, allPlans){
                if(err){
                    console.log(err);
                } else{
                    res.render("plan/index", {plans: allPlans, team: team});
                }
            });
        }
    });
});

// NEW - show form to create new shift plan
router.get("/new", function(req, res){
    Team.findById(req.params.id, function(err, team){
        if(err){
            console.log(err);
        } else{
            res.render("plan/new", {team: team});
         }
    });
});

// CREATE new plan
router.post("/", function(req, res){
    Team.findById(req.params.id).populate("plans members").exec(function(err, team){
        if(err){
            //req.flash("error", "Team not found");
            res.redirect("back");
        } else{
            var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

            var year = parseInt(req.body.year, 10);
            var month = parseInt(req.body.month, 10) - 1;

            getDaysInMonth(month, year);
    
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

            var shiftPlan;

            var shiftPlanF0 = [];
            var shiftPlanA0 = [];
            var shiftPlanA1 = [];
            var shiftPlanB1 = [];
            var shiftPlanA2 = [];
            var shiftPlanB2 = [];

            var editors = [];
            var partTimeEditors = [];

            team.members.forEach(function(member) {
                if(member.isEditor) {
                    editors.push(member);
                }
            });

            for( var i = firstDayOfMonth; i < dates.length + firstDayOfMonth; i++) {
                shiftPlanF0.push(0);
                shiftPlanA0.push(monthA0[i]);
                shiftPlanA1.push(monthA1[i]);
                shiftPlanB1.push(monthB1[i]);
                shiftPlanA2.push(monthA2[i]);
                shiftPlanB2.push(monthB2[i]);
            }
            
            var newPlan = {editors: editors, partTimeEditors: partTimeEditors, year: year, month: month, dates: dates, days: days, firstDayOfMonth: firstDayOfMonth, monthA0: monthA0, monthA1: monthA1, monthB1, monthB1, monthA2: monthA2, monthB2: monthB2, shiftPlanA0: shiftPlanA0, shiftPlanF0: shiftPlanF0};

            Plan.create(newPlan, function(err, plan){
                if(err){
                    console.log(err);
                } else {
                    team.members.forEach(function(member) {
                        if (member.position === "Teamlead") {
                            member.plans.push({id: plan._id, shift: shiftPlanA0});
                            member.save();
                        } else if (member.position === "Freelancer") { 
                            member.plans.push({id: plan._id, shift: shiftPlanF0});
                            member.save();
                        }
                    });
                    editors.forEach(function(member, index) {
                        if (index === 0 || index === 4){
                            member.plans.push({id: plan._id, shift: shiftPlanA1});
                            member.save();
                        } else if (index === 1 || index === 5){
                            member.plans.push({id: plan._id, shift: shiftPlanB1});
                            member.save();
                        } else if (index === 2 || index === 6){
                            member.plans.push({id: plan._id, shift: shiftPlanA2});
                            member.save();
                        } else if (index === 3 || index === 7){
                            member.plans.push({id: plan._id, shift: shiftPlanB2});
                            member.save();
                        } 
                    });
                    team.members.forEach(function(member){
                        member.plans.forEach(function(p){
                            if(p.id.equals(plan._id)) {
                                plan.memberPlans.push({id: member._id, shift: p.shift});
                            }
                        });
                    });
                    plan.save();
                    team.plans.push(plan);
                    team.save();
                    res.redirect("/teams/" + team._id + "/plan/" + plan._id);
                }
            });
        }
    });
});

//SHOW Shift Plan
router.get("/:planID", function(req, res){
    Team.findById(req.params.id).populate("members").exec(function(err, foundTeam){
        if(err){
            //req.flash("error", "Team not found");
            res.redirect("back");
        } else{
            Plan.findById(req.params.planID, function(err, foundPlan){
                if(err){
                    res.redirect("back");
                } else {
                    res.render("plan/show", {team: foundTeam, plan: foundPlan});
                }
            });
        }
    });
});

// EDIT Shift Plan
router.get("/:planID/edit", function(req, res){
    Team.findById(req.params.id).populate("members").exec(function(err, foundTeam){
        if(err || !foundTeam){
            //req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        Plan.findById(req.params.planID, function(err, foundPlan){
            if(err){
                res.redirect("back");
            } else {
                res.render("plan/edit", {team: foundTeam, plan: foundPlan});
            }
        });
    });
});

//Update shiftplan
router.put("/:planID", function(req, res){
    Plan.findByIdAndUpdate(req.params.planID, req.body.plan, function(err, updatedPlan){
        if(err){
            res.redirect("back");
        } else {
            Team.findById(req.params.id).populate("members").exec(function(err, team){
                if(err){
                    res.redirect("back");
                } else{
                    var shiftsArr = [];
                    updatedPlan.memberPlans.forEach(function(memberPlan) {
                        team.members.forEach(function(member){
                            
                            if(member._id = memberPlan.id) {
                                console.log(typeof req.body.shift);
                                shiftsArr.push(req.body.shift);
                                var shift = parseInt(req.body.shift, 10);
                                shiftsArr.forEach(function(shift){
                                    memberPlan.shift = shift;
                                })
                                // memberPlan.shift = shiftsArr;
                                
                                //memberPlan.shift.split(',').map(Number);
                            }
                        });
                    });
                }
                updatedPlan.save();
                res.redirect("/teams/" + team._id + "/plan/");
            });
        }
    });
});


module.exports = router;