const mongoose = require("mongoose");

const genresSchema = new mongoose.Schema({
    //genreID: {type: Number, required: true, unique: false},
    genre: {type: String, required: true, unique: false},
    description: {type: String, required: true, unique: false}
});

module.exports = Genre = mongoose.model("genres", genresSchema); 