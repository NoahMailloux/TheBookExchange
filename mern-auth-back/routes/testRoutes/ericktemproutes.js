const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");

/*Ignore this */


router.post("/creatediscussion", async (req, res) =>{
//comment
    try{
      const {email, password} = req.body;

      //validate
      if(!email || !password)
       return res.status(400).json({msg: "Not all fields have been entered"});

       const user = await User.findOne({email: email});
      if(!user)
       return res
            .status(400)
            .json({msg: "No account with this email has been registered."});

      const isMatch = await bcrypt.compare(password, user.password);
      if(!isMatch)
        return res
        .status(400)
        .json({msg: "Invalid credentials."});

      const token  = jwt.sign({id: user._id}, process.env.JWT_SECRET);
      res.json({
          token,
          user: {
            id: user._id,
            displayName: user.displayName,
          },
      })
    } catch(err){
        res.status(500).json({error: err.message});
    }
})

module.exports = router;