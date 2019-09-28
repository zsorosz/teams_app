var mongoose = require("mongoose");

var teamSchema = new mongoose.Schema({
    country: String,
    teamlead: String,
    size: String
});

module.exports = mongoose.model("Team", teamSchema);