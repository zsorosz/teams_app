var express = require("express");
var router = express.Router({mergeParams: true});
var Team = require("../models/team");
var Member = require("../models/member");

// New member
router.get("/new", function(req, res){
    Team.findById(req.params.id, function(err, team){
        if(err){
            console.log(err);
        } else{
            res.render("members/new", {team: team});
        }
    });
});

// // Create member
// router.post("/", function(req, res){
//     var firstname = req.body.firstname;
//     var position = req.body.position;
//     var newMember = {firstname: firstname, position: position};
//     Member.create(newMember, function(err, member){
//         Team.findById(req.params.id, function(err, foundTeam){
//             if(err){
//                 console.log(err);
//             } else {
//                 member.save();
//                 foundTeam.members.push(member);
//                 foundTeam.save();
//                 res.redirect("/teams");
//                 console.log(member.firstname);
//             }
//         });
//     });
// });

//Create member
router.post("/", function(req, res){
    Team.findById(req.params.id, function(err, team){
        if(err){
            console.log(err);
            res.redirect("/teams");
        } else {
            console.log(req.body.member);
            Member.create(req.body.member, function(err, member){
                if(err){
                    console.log(err);
                } else {
                    member.save();
                    team.members.push(member);
                    team.save();
                    res.redirect("/teams/" + team._id);
                    console.log(member.firstname);
                }
            });
        }
    });
});

// Edit member
router.get("/:member_id/edit", function(req, res){
    Team.findById(req.params.id, function(err, foundTeam){
        if(err || !foundTeam){
            //req.flash("error", "Campground not found");
            return res.redirect("back");
        }
        Member.findById(req.params.member_id, function(err, foundMember){
            if(err){
                res.redirect("back");
            } else {
                res.render("members/edit", {team_id: req.params.id, member: foundMember});
            }
        });
    });
});

module.exports = router;