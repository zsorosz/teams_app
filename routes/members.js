var express = require("express");
var router = express.Router({mergeParams: true});
var middleware = require("../middleware");
var Team = require("../models/team");
var Member = require("../models/member");

// New member
router.get("/new", middleware.isAdmin, function(req, res){
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
router.post("/", middleware.isAdmin, function(req, res){
    Team.findById(req.params.id, function(err, team){
        if(err){
            console.log(err);
            res.redirect("/teams");
        } else {
            Member.create(req.body.member, function(err, member){
                if(err){
                    console.log(err);
                } else {
                    if(member.position === "Editor"){
                        member.isEditor = true;
                    }
                    member.save();
                    team.members.push(member);
                    team.save();
                    res.redirect("/teams/" + team._id);
                }
            });
        }
    });
});

// Edit member
router.get("/:member_id/edit", middleware.isAdmin, function(req, res){
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

//Update member
router.put("/:member_id", middleware.isAdmin, function(req, res){
    Member.findByIdAndUpdate(req.params.member_id, req.body.member, function(err, updatedMember){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/teams/" + req.params.id);
        }
    });
});

//Delete member
router.delete("/:member_id", middleware.isAdmin, function(req, res){
    //findById and remove
    Member.findByIdAndRemove(req.params.member_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            //req.flash("success", "Comment deleted")
            res.redirect("/teams/" + req.params.id);
        }
    });
});

module.exports = router;