const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const Discussion = require("../../models/discussionmodel")

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


router.post("/creatediscussion", async (req, res) =>{
//comments


const discussion = await Discussion.findById(req.user);

const {title = "Ron Vs Harry", creator, book = "harry potter", genre = "Sci-Fi" } = req.body;
try{
  const token = req.header("x-auth-token");
  if(!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if(!verified) return res.json(false);

  const user = await User.findById(verified.id);
  if(!user) return res.json(false);

//not working verification of entered fields.


/*
if(!title || !book || !creator || !genre)
return res.status(400).json({msg: "Not all fields have been entered."});
*/


  const newDiscussion = new Discussion({
    title: title,
    creator: user.displayName,
    book: book,
    genre: genre
});
const creatediscussion = await newDiscussion.save();
        res.json(creatediscussion);


  return res.json(true);
 }catch(err){ 
     res.status(500).json({error: err.message});
 }
});




router.post("/createcomment", async (req, res) =>{
  //comments

  
  const discu = await Discussion.findById("601ad67671c72930180a3d25")
  const discussion = await Discussion.findById(req.user);
  
  try{
    const token = req.header("x-auth-token");
    if(!token) return res.json(false);
  
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified) return res.json(false);
  
    const user = await User.findById(verified.id);
    if(!user) return res.json(false);
  
    


    return res.json(discu._id);
   }catch(err){ 
       res.status(500).json({error: err.message});
   }
  });




module.exports = router;