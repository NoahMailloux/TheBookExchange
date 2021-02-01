const mongoose = require("mongoose");

const sharedBooksSchema = new mongoose.Schema({
    bookID: {type: Number, required: true, unique: false},
    sharerID: {type: Number, required: true, unique: false},
    receiverID: {type: Number, required: false, unique: false},
    lastUpdated: {type: String, required: true, unique: false}
});

module.exports = SharedBook = mongoose.model("sharedbooks", sharedBooksSchema); 