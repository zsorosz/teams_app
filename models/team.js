var mongoose = require("mongoose");

var teamSchema = new mongoose.Schema({
    country: String,
    countrycode: String,
    teamlead: String,
    size: Number,
    image: String
});

module.exports = mongoose.model("Team", teamSchema);