const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
    bookID: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: false},
    genreID: {type: Number, required: true, unique: false},
    rating: {type: Number, required: true, unique: false},
    price: {type: Number, required: true, unique: false},
    author: {type: String, required: true, unique: false},
    synopsis: {type: String, required: true, unique: false},
    bookUrl: {type: String, required: true, unique: false},  
});

module.exports = Book = mongoose.model("books", booksSchema); 