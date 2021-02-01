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
const {title, creator } = req.body;
try{
  const token = req.header("x-auth-token");
  if(!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if(!verified) return res.json(false);

  const user = await User.findById(verified.id);
  if(!user) return res.json(false);

  const newDiscussion = new Discussion({
    title,
    creator: user.displayName,
});
const creatediscussion = await newDiscussion.save();
        res.json(creatediscussion);


  return res.json(true);
 }catch(err){ 
     res.status(500).json({error: err.message});
 }
})

module.exports = router;