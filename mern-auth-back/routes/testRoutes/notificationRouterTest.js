const router = require("express").Router();
const auth = require("../../middleware/auth");
const Notif = require("../../models/testModels/notificationsmodeltest");

// notificationID, userId, description, notificationDate, link

//get notification id

router.post("/notify", async( req,res)=>{
   //const notification = await Notif.findByID(res.notification);
    
   let userId = req.body.userId
   let discussionId = req.body.discussionId
   let message = req.body.message
   var currentdate = new Date(); 
        
   var lastUpdated = "Last Sync: " + currentdate.getDate() + "/"
   + (currentdate.getMonth()+1)  + "/" 
   + currentdate.getFullYear() + " @ "   
   + currentdate.getHours() + ":"
   + currentdate.getMinutes() + ":" 
   + currentdate.getSeconds(); //grabs current dateTime
    
    const newNotification = new notifcation({
            userID,
            discussionID,
            message,
            lastUpdated
        }); //create a new discussionFollow record
    const notificationNew = await newNotification.save(); // save the recor

    res.json({
        //notificationID: notification._id

        userId: userId,
        discussionId: discussionId,
        message: message
    });


});

module.exports = router;
