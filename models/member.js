var mongoose = require("mongoose");

var memberSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    position: String,
    hoursperweek: Number,
    team: String,
    isEditor: {type: Boolean, default: false},
    plans: [ 
        {
            id: {},
            shift: []
        }    
    ]
});

module.exports = mongoose.model("Member", memberSchema);