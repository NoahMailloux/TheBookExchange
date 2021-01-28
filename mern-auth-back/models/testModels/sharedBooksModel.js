const mongoose = require("mongoose");

const sharedBooksSchema = new mongoose.Schema({
    shareID: {type: Int, required: true, unique: true},
    bookID: {type: Int, required: true, unique: true},
    sharerID: {type: Int, required: true, unique: true},
    receiverID: {type: Int, required: true, unique: true}
});

module.exports = SharedBooks = mongoose.model("sharedbooks", sharedBooksSchema); 