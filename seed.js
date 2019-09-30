var mongoose = require("mongoose");
var Team = require("./models/team");
var Member = require("./models/member");
 
var data = [
    {
        country: "Hungary", 
        teamlead: "Ildiko Bognar",
        size: 6,
        image: "https://images.unsplash.com/photo-1563734484236-8b271b3c1e7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    },
    {
        country: "Germany", 
        teamlead: "German Guy",
        size: 12,
        image: "https://images.unsplash.com/photo-1506760610100-1af6025cf0c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80"
    },
    {
        country: "Hungary", 
        teamlead: "Ildiko Bognar",
        size: 6,
        image: "https://images.unsplash.com/photo-1563734484236-8b271b3c1e7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
    },
    {
        country: "Germany", 
        teamlead: "German Guy",
        size: 12,
        image: "https://images.unsplash.com/photo-1506760610100-1af6025cf0c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=752&q=80"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Team.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed teams!");
        Member.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed members!");
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
   });
}
 
module.exports = seedDB;