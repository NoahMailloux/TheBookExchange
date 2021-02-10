const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const Discussion = require("../../models/discussionmodel");
const Comment = require("../../models/commentsmodel")
const { db } = require("../../models/userModel");
const DiscussionFollows = require("../../models/discussionFollowsModel"); //require discussionFollowsModel

/*Ignore this */
//Find a user
router.get("/", auth, async (req, res) =>{
  const user = await User.findById(req.user);
  res.json({
      displayName: user.displayName,
      id: user._id,
  });
});
//

//CREATE DISCUSSION
router.post("/creatediscussion", async (req, res) =>{
//comments


const discussion = await Discussion.findById(req.user);

const {title = "Ron Vs Harry", creator = "erick", book = "harry potter", genre = "Sci-Fi", comment } = req.body;
try{
  const token = req.header("x-auth-token");
  if(!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if(!verified) return res.json(false);

  const user = await User.findById(verified.id);
  if(!user) return res.json(false);


if(!title || !book || !creator || !genre)
return res.status(400).json({msg: "Not all fields have been entered."});



  const newDiscussion = new Discussion({
    title: title,
    creator: user._id,
    book: book,
    genre: genre,
    //comment: comment is going to be connected through axios
});
const creatediscussion = await newDiscussion.save();
        res.json(creatediscussion);


 }catch(err){ 
     res.status(500).json({error: err.message});
 }
});



//CREATE COMMENT
router.post("/createcomment", async (req, res) =>{
  //comments
  
  //date and time for comment in mongodb
  var currentdate = new Date(); 
        var lastUpdated = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); //grabs current dateTime
        lastUpdated.toString();



  const {discussion_id, comment } = req.body;
  const discu = await Discussion.findById("601b4ccae79f885cdcece92e")
  const discussion = await Discussion.findById(req.user);
  
  try{
    const token = req.header("x-auth-token");
    if(!token) return res.json(false);
  
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) return res.json(false);
  
    const user = await User.findById(verified.id);
    if(!user) return res.json(false);
  
    const discussionID = discu._id;

    //get discussion followers for the discussion
  let discId = req.body.did;
  console.log(discId)
  const follows = await DiscussionFollows.find({discussionID: discId}, 'userID').exec();
  //for each follower add a notification in the table
  
  console.log(follows)
  //After we get the followers for the discussion, notify all users by adding notifications

    const newComment = new Comment({
      discussion_id: discu._id,
      user_id: user.id,
      posted_on: currentdate,
      comment: comment
  });

  
  const createcomment = await newComment.save();
  res.json(createcomment);
   }catch(err){ 
    console.log(err)
       res.status(500).json({error: err.message});
   }
  });

  //LIST DISCUSSIONS
router.post("/listdiscussions", async (req, res) =>{
  //comments

  const discussion = await Discussion.findById(req.user);

  try{
    const token = req.header("x-auth-token");
    if(!token) return res.json(false);
  
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) return res.json(false);
  
    const user = await User.findById(verified.id);
    if(!user) return res.json(false);


//print all discussion records
  const collection = db.collection('discussions');

  collection.find({}).toArray(function(err, discussions){

    console.log(JSON.stringify(discussions, null, 2));
  });



    return res.json(true);
   }catch(err){ 
       res.status(500).json({error: err.message});
   }
  });


  //LIST COMMENTS
  router.post("/listcomments", async (req, res) =>{
    //comments
  
    const comments = await Comments.findById(req.user);

  try{
    const token = req.header("x-auth-token");
    if(!token) return res.json(false);
  
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) return res.json(false);
  
    const user = await User.findById(verified.id);
    if(!user) return res.json(false);


//print all discussion records
  const collection = db.collection('comments');

  collection.find({}).toArray(function(err, comments){

    console.log(JSON.stringify(comments, null, 2));
  });



    return res.json(true);
   }catch(err){ 
       res.status(500).json({error: err.message});
   }
    });



module.exports = router;