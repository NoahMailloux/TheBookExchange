const mongoose = require("mongoose");

const discussionFollowsSchema = new mongoose.Schema({
    discussionID: {type: Number, required: true, unique: false},
    userID: {type: Number, required: true, unique: false},
    bookID: {type: Number, required: true, unique: false},
    lastUpdated: {type: String, required: true, unique: false}
});

module.exports = DiscussionFollow = mongoose.model("discussionfollows", discussionFollowsSchema); //creates mongoose model to search and save users
//in user collection with userSchema