var express = require("express");
var router = express.Router();

//INDEX - show all teams
router.get("/", function(req, res){
    res.render("landing");
});

module.exports = router;