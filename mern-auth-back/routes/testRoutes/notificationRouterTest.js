const router = require("express").Router();
const auth = require("../../middleware/auth");
const Notif = require("../../models/testModels/notificationsmodeltest");

// notificationID, userId, description, notificationDate, link

//get notification id


router.post("/notify", async( req,res)=>{
   //const notification = await Notif.findByID(res.notification);
    
   try{
    
    let userId = req.body.userId
   
    let discussionId = req.body.discussionId
   
    let description = req.body.message
   
    var currentdate = new Date(); 
        
   
    var notificationDate = "Last Sync: " + currentdate.getDate() + "/"
   
    + (currentdate.getMonth()+1)  + "/" 
   
    + currentdate.getFullYear() + " @ "   
   
    + currentdate.getHours() + ":"
   
    + currentdate.getMinutes() + ":" 
   
    + currentdate.getSeconds(); //grabs current dateTime
    
    const newNotification = new Notif({
            userId,
            discussionId,
            description,
            notificationDate
    
        }); //create a new discussionFollow record
    const notificationNew = await newNotification.save(); // save the recor

    res.json({
        //notificationID: notification._id

        //userId: userId,
        //discussionId: discussionId,
        //message: message

        newNotification
    });
    
   }catch(err){
       res.status(500).json({error: err.message});
   }

   


});

//getNotifications for a specific user
router.get("/userNotifications", async(req,res)=>{
    let nid = req.body.userId;
    console.log(req);
    console.log(req.query);
    console.log(nid);
    const userNotifications = await Notif.find({userId: nid}).exec();
    res.json(JSON.stringify(userNotifications))
})


//deleteNotification
router.delete("/deleteNotification",auth, async(req, res)=>{
    try{
        
        const deleteNotification = await Notif.findByIdAndDelete(req.body.nid);
        res.json(deleteNotification);

    }
    catch(err){
        res.status(500).json({error: err.message});
    }

})

module.exports = router;
