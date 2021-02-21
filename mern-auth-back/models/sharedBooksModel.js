const mongoose = require("mongoose");

const sharedBooksSchema = new mongoose.Schema({
    bookID: {type: String, required: true, unique: false},
    sharerID: {type: String, required: true, unique: false},
    receiverID: {type: String, required: false, unique: false},
    lastUpdated: {type: String, required: true, unique: false}
});

module.exports = SharedBook = mongoose.model("sharedbooks", sharedBooksSchema); 