const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    address: {type: String, required: true, unique: false},
    tracking_num: {type: Number, required: false, unique: false},
    price: {type: Number, required: true, unique: false},
    product_num: {type: Number, required: true, unique: false},
    userID: {type: String, required: true, unique: false},
    status: {type: String, required: false, unique: false},
    created_at: {type: String, required: true, unique: false}
});

module.exports = Order = mongoose.model("orders", ordersSchema); 