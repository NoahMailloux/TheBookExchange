const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const fetch = require("node-fetch");

router.get("/searchBook", async (req, res) => {
  console.log(req.headers)
  const search = req.header("search"); //grab info from body
  const token = req.header("x-auth-token"); //grab token
  if (!token) return res.json("No token"); //if no token, don't accept
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) return res.json("false token"); //if not a real token, don't accept
  const user = await User.findById(verified.id);
  if (!user) return res.json("no user"); //if token doesn't match a user, don't accept
  data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode

  fetch(`https://api.zinc.io/v1/search?query=${search}%20Book&page=1&retailer=amazon`, {
  headers: {
    Authorization: "Basic QUE2NDNEMUNERkFDNTFGNTVENTlGODgwOiA="
  }
})
    .then((res) => res.text())
    .then((text) => {
      res.json(text)});
});

module.exports = router;
