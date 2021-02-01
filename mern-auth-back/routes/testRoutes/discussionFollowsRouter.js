const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const DiscussionFollows = require("../../models/testModels/discussionFollowsModel"); //require discussionFollowsModel

router.post("/followDiscussion", async (req, res) => { //when /followDiscussion is requested this will be run

    try{
        const {discussionID, userID, bookID} = req.body; //grab info from body
        const token = req.header("auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        
        var currentdate = new Date(); 
        var lastUpdated = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); //grabs current dateTime
                lastUpdated.toString();

        const newDiscussionFollow = new DiscussionFollow({
            discussionID,
            userID,
            bookID,
            lastUpdated
        }); //create a new discussionFollow record

        const followDiscussion = await newDiscussionFollow.save(); // save the record
        res.json(followDiscussion); //send back the new discussion follow record

    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch

}); // end router.post("/followDiscussion" //this route creates a new discussion follow record

router.get("/getDiscussionFollows", async (req, res) => { //when /getDiscussionFollows is requested this will be run

    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const existingUser = data.id;//grab current user
        let did = req.query.did; // did is database generated unique ID
        try{
            const follows = await DiscussionFollow.find({discussionID:did}).exec(); //grabs all discussionFollow records
            res.json(JSON.stringify(follows)) //sends back all discussion follows records objects
        }catch(ex){
            // execution continues here when an error was thrown. You can also inspect the `ex`ception object
        }
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch


}); // end router.post("/getDiscussionFollows" //this route sends back all discussion follows records objects

//2 routes to make

// DiscussionFollow._id grabs id of specific discussion follow record

//make unfollow route

//make myFollows route ( like getDiscussionFollows but replace discussionID with userID ) const follows = await DiscussionFollow.find({discussionID:did}).exec(); //grabs all discussionFollow records

module.exports = router;