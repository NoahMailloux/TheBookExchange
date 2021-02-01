const mongoose = require("mongoose");

const thisMonthSchema = new mongoose.Schema({
    userId: {type:String, required:true},
    bookId: {type:String, required:true},
    sharerId: {type:String, required:true},
    productNum:{type:String}


})

module.exports = thisMonthsBook = mongoose.model("", thisMonthSchema);