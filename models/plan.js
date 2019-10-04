var mongoose = require("mongoose");

var planSchema = mongoose.Schema({
    weekA1: [Number],
    weekB1: [Number],
    weekA2: [Number],
    weekB2: [Number]
});

module.exports = mongoose.model("Plan", planSchema);