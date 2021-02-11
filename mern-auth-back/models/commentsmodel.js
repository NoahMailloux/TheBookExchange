//Mongoose discussion Schema

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    discussion_id: {type: String, required: true}, //_id unique: true
    user_id: {type: String, required: true}, //creator or username
    //comment_id: {type: String, required: true, unique: true}, self creates its ID
    //root_comment: {type: String, required: true},
    posted_on : { type : String, required: true},
    comment: {type: String, required: true, minlength: 5}
});

module.exports = Comments = mongoose.model("comments", commentSchema);