//Mongoose discussion Schema

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    discussion_id: {type: String, required: true, unique: true},
    user_id: {type: Number, required: true},
    comment_id: {type: String, required: true, unique: true},
    root_comment: {type: String, required: true},
    posted_on: {type: String, required: true},
    comment: {type: String, required: true, minlength: 5}
});

module.exports = comments = mongoose.model("comments", commentSchema);