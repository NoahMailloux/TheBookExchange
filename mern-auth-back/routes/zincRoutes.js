const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const fetch = require("node-fetch");

router.post("/searchBook", async (req, res) => {
  const { search } = req.body; //grab info from body
  const token = req.header("x-auth-token"); //grab token
  if (!token) return res.json(false); //if no token, don't accept
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) return res.json(false); //if not a real token, don't accept
  const user = await User.findById(verified.id);
  if (!user) return res.json(false); //if token doesn't match a user, don't accept
  data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode

  fetch("https://api.zinc.io/v1/search?query=fish%20oil&page=1&retailer=amazon", {
  headers: {
    Authorization: "AA643D1CDFAC51F55D59F880",
    Password: ""
  }
})
    .then((res) => res.text())
    .then((text) => console.log(text));
});

module.exports = router;
