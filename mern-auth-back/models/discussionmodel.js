//Mongoose discussion Schema

const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
    
    title: {type: String, required: true},
    creator: {type: String, required: true},
    book: {type: String, required: true}, 
    genre: {type: String, required: true},
    comment: {type: String, required: true}
});

module.exports = Discussion = mongoose.model("discussions", discussionSchema); 