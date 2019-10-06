var mongoose = require("mongoose");

var teamSchema = new mongoose.Schema({
    country: String,
    countrycode: String,
    teamlead: String,
    size: Number,
    image: String,
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Member"
        }
    ],
    plans: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Plan"
        }
        
    ]
});

module.exports = mongoose.model("Team", teamSchema);