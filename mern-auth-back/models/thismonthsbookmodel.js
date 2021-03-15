const mongoose = require("mongoose");

const thisMonthSchema = new mongoose.Schema({
    sharerId: {type:String, required:true},
    productNum:{type:String},
    title: {type:String},
    genre: {type:String}
})

module.exports = thisMonthsBook = mongoose.model("monthlybook", thisMonthSchema);