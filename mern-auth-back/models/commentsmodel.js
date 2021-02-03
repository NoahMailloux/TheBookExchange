//Mongoose discussion Schema

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    discussion_id: {type: String, required: true, unique: true}, //_id
    user_id: {type: Number, required: true}, //creator or username
    //comment_id: {type: String, required: true, unique: true}, self creates its ID
    //root_comment: {type: String, required: true},
    posted_on : { type : Date, default: Date.now },
    comment: {type: String, required: true, minlength: 5}
});

module.exports = comments = mongoose.model("comments", commentSchema);