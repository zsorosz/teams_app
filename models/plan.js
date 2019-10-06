var mongoose = require("mongoose");

var planSchema = mongoose.Schema({
    year: Number,
    month: Number,
    team: Number, 
    dates: [], 
    days: [], 
    firstDayOfMonth: Number, 
    monthA0: [], 
    monthA1: [], 
    monthB1: [], 
    monthA2: [], 
    monthB2: []
});

module.exports = mongoose.model("Plan", planSchema);