var mongoose = require("mongoose");

var memberSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    position: String,
    hoursperweek: Number,
    team: String
});

module.exports = mongoose.model("Member", memberSchema);