const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    displayName: {type: String},
    subscribedGenre: {type: String, unique: false},
    address: {type: String, unique: false}
});

module.exports = User = mongoose.model("users", userSchema); //creates mongoose model to search and save users
//in user collection with userSchema