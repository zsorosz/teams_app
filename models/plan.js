var mongoose = require("mongoose");

var planSchema = mongoose.Schema({
    year: Number,
    month: Number,
    team: Number,
    editors: [],
    partTimeEditors: [], 
    dates: [], 
    days: [], 
    firstDayOfMonth: Number, 
    monthA0: [], 
    monthA1: [], 
    monthB1: [], 
    monthA2: [], 
    monthB2: [],
    shiftPlanA0: [],
    shiftPlanA1: [],
    shiftPlanB1: [],
    shiftPlanA2: [],
    shiftPlanB2: [],
    shiftPlanF0: []
});

module.exports = mongoose.model("Plan", planSchema);