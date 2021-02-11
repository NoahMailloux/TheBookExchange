const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
    //noticationId: {type:String, required:true},
    userId: {type:String, required:true},
    discussionId: {type: String, required: true},
    description: {type:String},
    notificationDate:{type:Date},
    //link: {type:String}


})

module.exports = Notif = mongoose.model("notifications", notificationsSchema);