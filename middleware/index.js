var Team = require("../models/team");
var Member = require("../models/member");
// All the middlewares
var middlewareObj = {};

middlewareObj.isAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.isAdmin){
            next();
        } else {
                    //req.flash("error", "You don't have permission to do that.");
            res.redirect("back");
        }
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
}

module.exports = middlewareObj
