const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
    try{
    let { email, password, passwordCheck, displayName, address, postCode, state, city} = req.body;

    //validate

    if(!email || !password || !passwordCheck || !address || !postCode || !state || !city)
        return res.status(400).json({msg: "Not all fields have been entered."});
    if (password.length < 5)
        return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long."});
    if (password !== passwordCheck)
        return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification."});


     const existingUser = await User.findOne({email: email});
     if (existingUser)
        return res
        .status(400)
        .json({ msg: "An account with this email already exists."});

        if(!displayName) displayName = email;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        const subscribedGenre = ""; //provide blank genre 
        const newUser = new User({
            email,
            password: passwordHash,
            displayName,
            subscribedGenre,
            address,
            postCode,
            state,
            city
        });
        const savedUser = await newUser.save();
        res.json(savedUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});


router.post("/login", async (req, res) =>{
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

router.delete("/delete", auth, async(req, res) =>{
    try{
    const token = req.header("x-auth-token"); //grab token
    data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode    
     const deletedUser = await User.findByIdAndDelete(req.user);
     res.json(deletedUser);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

router.post("/tokenIsValid", async (req, res) => {
    try{
     const token = req.header("x-auth-token");
     if(!token) return res.json(false);

     const verified = jwt.verify(token, process.env.JWT_SECRET);
     if(!verified) return res.json(false);

     const user = await User.findById(verified.id);
     if(!user) return res.json(false);

     return res.json(true);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});



router.get("/", auth, async (req, res) =>{
    const user = await User.findById(req.user);
    res.json({
        displayName: user.displayName,
        id: user._id,
    });
});

router.get("/subscribeToGenre", async (req, res) => { //when /subscribeToGenre is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        var user_id = data.id; //grabs the users auto generated id from the token
        User.findByIdAndUpdate(user_id, { subscribedGenre: req.body.fid }, //find the user, update the genre with fid in body
                                    function (err, docs) { 
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Updated User : ", docs); 
            } 
        }); 
        console.log(user_id)
        res.json("Genre updated") //sends back update confirm
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/subscribeToGenre" //this route updates the subscribed genre of the logged in user


//Erick added route
router.post("/creatediscussion", async (req, res) =>{

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


//router.get("/test", (req, res) => {
//    res.send("hello, its working");
//});
 