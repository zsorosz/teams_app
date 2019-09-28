var mongoose = require("mongoose");
var Team = require("./models/team");
 
var data = [
    {
        country: "Hungary", 
        teamlead: "Ildiko Bognar",
        size: "6"
    },
    {
        country: "Germany", 
        teamlead: "German Guy",
        size: "12"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Team.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed teams!");
             //add a few campgrounds
            data.forEach(function(seed){
                Team.create(seed, function(err, team){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a team");
                    }
                });
            });
        });
}
 
module.exports = seedDB;