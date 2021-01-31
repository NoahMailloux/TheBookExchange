const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");

/*Ignore this */


router.post("/creatediscussion", async (req, res) =>{
//comments
const {title, creator } = req.body;
try{
  const token = req.header("x-auth-token");
  if(!token) return res.json(false);

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if(!verified) return res.json(false);

  const user = await User.findById(verified.id);
  if(!user) return res.json(false);

  const newDiscussion = new User({
    email,
    password: passwordHash,
    displayName
});
  return res.json(true);
 }catch(err){ 
     res.status(500).json({error: err.message});
 }
})

module.exports = router;