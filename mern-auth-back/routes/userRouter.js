const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const userModel = require("../models/userModel");
const User = require("../models/userModel");
const fetch = require('node-fetch');
const stripe = require('stripe')('sk_test_51IV2RTDvCxMcNVdKhvqpflF0x6DrrsdaxngoYP0xVK9rBbONkodzbVOcX4k7uS6VYFjL84spNuZTvtl644C7Rpyp00vDcQ5xTH');

router.post("/register", async (req, res) => {
  try {
    let {
      email,
      password,
      passwordCheck,
      displayName,
      address,
      postCode,
      state,
      city,
      paid
    } = req.body;

    //validate

    if (
      !email ||
      !password ||
      !passwordCheck ||
      !address ||
      !postCode ||
      !state ||
      !city
    )
      return res.status(400).json({ msg: "Not all fields have been entered." });
    if (!paid) {
      res.status(400).json({msg: "Please enter payment info"});
    }
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    if (!displayName) displayName = email;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const paypalID = "paypalID";
    const fname = "First Name";
    const lname = "Last Name";
    const phone = "Phone"; //provide blank filds
    const subscribedGenre = "";
    const newUser = new User({
      email,
      password: passwordHash,
      displayName,
      subscribedGenre,
      address,
      postCode,
      state,
      city,
      paypalID,
      fname,
      lname,
      phone,
      paid
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getUser", async (req, res) => {
  //when /getUser is requested this will be run
  try {
    const token = req.header("x-auth-token"); //grab token
    if (!token) return res.json(false); //if no token, don't accept
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false); //if not a real token, don't accept
    const user = await User.findById(verified.id);
    data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode
    if (!user) return res.json(false); //if token doesn't match a user, don't accept
    const users = await User.find({ _id: data.id }).exec(); //grabs logged in users db object
    res.json(JSON.stringify(users)); //sends back user object
  } catch (err) {
    res.status(500).json({ error: err.message });
  } //end try,catch
}); // end router.get("/getUser" //This route will find a user record

router.delete("/delete", auth, async (req, res) => {
  try {
    const token = req.header("x-auth-token"); //grab token
    data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    displayName: user.displayName,
    id: user._id,
  });
});

router.get("/subscribeToGenre", async (req, res) => {
  //when /subscribeToGenre is requested this will be run
  try {
    const token = req.header("x-auth-token"); //grab token
    data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode
    var user_id = data.id; //grabs the users auto generated id from the token
    User.findByIdAndUpdate(
      user_id,
      { subscribedGenre: req.header("genre") }, //find the user, update the genre with fid in body
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated User : ", docs);
        }
      }
    );
    console.log(user_id);
    res.json("Genre updated"); //sends back update confirm
  } catch (err) {
    res.status(500).json({ error: err.message });
  } //end try,catch
}); // end router.post("/subscribeToGenre" //this route updates the subscribed genre of the logged in user

router.get("/subscribedGenre", async (req, res) => {
  try {
    const token = req.header("x-auth-token"); //grab token
    data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode
    var user_id = data.id; //grabs the users auto generated id from the token
    var userInfo;
    userInfo = await User.find( {_id: user_id }).exec()
    res.json(userInfo); //sends back update confirm
  } catch (err) {
    res.status(500).json({ error: err.message });
  } //end try,catch
});

//Erick added route
router.post("/creatediscussion", async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/updateAddress", auth, async (req, res) =>{

    const user = await User.findById(req.user);
    console.log(req.body.address);
    const address = req.body.address;
    const city = req.body.city;
    const state = req.body.state;
    const postCode = req.body.postCode;
    console.log("got here, router.put")
    try{
        await userModel.findById(req.user, (err, updatedUser)=>{
            updatedUser.address = address
            updatedUser.city = city
            updatedUser.state = state
            updatedUser.postCode = postCode
            updatedUser.save
            console.log("got here, try")
            res.send("Update");
        });
    }catch(err){
        console.log(err);
    }
});

router.post("/create-checkout-session", async (req, res) => {
  const { priceId } = req.body;

  // See https://stripe.com/docs/api/checkout/sessions/create
  // for additional parameters to pass.
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'https://example.com/canceled.html',
    });

    res.send({
      sessionId: session.id,
    });
  } catch (e) {
    res.status(400);
    return res.send({
      error: {
        message: e.message,
      }
    });
  }
});

router.post('/sub', async (req, res) => {
  try {
  let email = req.body.email;
  let payment_method = req.body.payment_method
  const customer = await stripe.customers.create({
    payment_method: payment_method,
    email: email,
    invoice_settings: {
      default_payment_method: payment_method,
    },
  });

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ plan: 'price_1IV2UXDvCxMcNVdKfyEU8eFJ' }],
    expand: ['latest_invoice.payment_intent']
  });
  
  const status = subscription['latest_invoice']['payment_intent']['status'] 
  const client_secret = subscription['latest_invoice']['payment_intent']['client_secret']

  res.json({'client_secret': client_secret, 'status': status});
}
catch(err){
  console.log(err);
}
})


module.exports = router;

//router.get("/test", (req, res) => {
//    res.send("hello, its working");
//});
