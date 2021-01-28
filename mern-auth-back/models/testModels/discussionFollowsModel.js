const mongoose = require("mongoose");

const discussionFollowsSchema = new mongoose.Schema({
    discussionID: {type: Number, required: true, unique: true},
    userID: {type: Number, required: true, unique: true},
    bookID: {type: Number, required: true, unique: true},
    lastUpdated: {type: String, required: true}
});

module.exports = DiscussionFollows = mongoose.model("discussionfollows", discussionFollowsSchema); //creates mongoose model to search and save users
//in user collection with userSchema