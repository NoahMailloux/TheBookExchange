const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const DiscussionFollows = require("../models/discussionFollowsModel"); //require discussionFollowsModel

//THIS ROUTER IS FINISHED

router.post("/followDiscussion", async (req, res) => { //when /followDiscussion is requested this will be run
    try{
        const {discussionID, bookID} = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode    
        var currentdate = new Date(); 
        var lastUpdated = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); //grabs current dateTime
        lastUpdated.toString();
        let userID = data.id.toString(); 
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
}); // end router.post("/followDiscussion" //This route creates a new discussion follow record
//Pass the discussionID followed by the bookID in req.body

router.get("/getDiscussionFollows", async (req, res) => { //when /getDiscussionFollows is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        let did = req.query.did;
        const follows = await DiscussionFollow.find({discussionID: did}).exec(); //grabs all discussionFollow records for discussion id
        res.json(JSON.stringify(follows)) //sends back all discussion follows records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getDiscussionFollows" //This route sends back all records for a specific discussion
//Pass the non-unique discussionID record in req.body.did

router.get("/myFollows", async (req, res) => { //when /myFollows is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const myFollows = await DiscussionFollow.find({userID:data.id}).exec(); //grabs all discussionFollow records for a specific user
        res.json(JSON.stringify(myFollows)) //sends back the records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/myFollows" //This route sends back all discussion follow records for the currently logged in user.

router.delete("/unFollow", auth, async(req, res) =>{ //when /unFollow is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const deletedFollow = await DiscussionFollow.findByIdAndDelete(req.body.fid); //passing db id, in body, of discussionFollow, finding and deleting it
        res.json(deletedFollow); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.delete("/unFollow" //This route will delete a discussion follow record
//Pass the unique databaseID of the discussionFollow record in req.body.fid to delete it

module.exports = router;