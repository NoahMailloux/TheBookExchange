const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID : {type: Int, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    fName: {type: String},
    lName: {type: String},
    address: {type: String},
    genre_id: {type: String},
    subscribed_genre: {type: String}
});

module.exports = User = mongoose.model("user", userSchema); //creates mongoose model to search and save users
//in user collection with userSchema

//need to change "" table prob already exsists 