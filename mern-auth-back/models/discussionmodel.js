//Mongoose discussion Schema

const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
    
    title: {type: String, required: true, minlength: 5},
    creator: {type: String, required: true}

});

module.exports = discussion = mongoose.model("discussion", discussionSchema); 