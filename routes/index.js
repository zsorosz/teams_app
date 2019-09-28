var express = require("express");
var router = express.Router();

//INDEX - show all teams
router.get("/", function(req, res){
    res.send('Hello World!')
});

module.exports = router;