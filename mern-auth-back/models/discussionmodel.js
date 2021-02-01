//Mongoose discussion Schema

const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
    
    title: {type: String},
    creator: {type: String}

});

module.exports = Discussion = mongoose.model("discussions", discussionSchema); 