const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const DiscussionFollows = require("../../models/testModels/discussionFollowsModel"); //require discussion model

router.post("/followDiscussion", async (req, res) => { //when /followDiscussion is requested this will be run

    //verify token



    try{
        const token = req.header("auth-token");
        data = jwt.decode(token,process.env.JWT_SECRET);
        console.log(data);
        res.json(data.id);

   /*  const token = req.header("x-auth-token");
     if(!token) return res.json(false);

     const verified = jwt.verify(token, process.env.JWT_SECRET);
     if(!verified) return res.json(false);

     const user = await User.findById(verified.id);
     if(!user) return res.json(false);

     return res.json(true); */
    }catch(err){
        res.status(500).json({error: err.message});
    } 

    // grab current user

  /*  const existingUser = await User.findOne({email: email});

    //grab discussion id

    const discussion_ID = "";

    //create follow record
    var timestamp = new Date().getUTCMilliseconds();
 
    try{
        const newFollow = new DiscussionFollows({
            followID: timestamp,
            discussionID: discussion_ID,
            userID: existingUser.displayName
           // lastUpdated
        });
        const savedFollow = await newFollow.save();
        res.json(savedFollow);

    }catch(err){
        res.status(500).json({error: err.message});
    }
    */


});

module.exports = router;