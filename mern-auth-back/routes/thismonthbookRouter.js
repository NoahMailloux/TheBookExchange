const router = require("express").Router();
const auth = require("../middleware/auth");
const thisMonthsBook = require("../models/thismonthsbookmodel");
const jwt = require("jsonwebtoken");

// current book

router.post("/monthly", async (req, res) => {
  try {
    const token = req.body.token; //grab token
    data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!token) return res.json(false);
    if (!user) return res.json(false);

    let genren = req.body.genre;
    let sharerId = data.id;
    let prodNum = req.body.productNum;
    let bookExists = await thisMonthsBook.find({ sharerId: sharerId }).exec();
    let id = "";
    if (bookExists.length != 0) {
      id = bookExists[0]._id;
    }
    let name = req.body.title;
    console.log(genren);
    if (bookExists.length != 0) {
      //console.log(bookExists);
      const s = await thisMonthsBook.findByIdAndUpdate(
        id,
        { productNum: prodNum, title: name, genre: genren },
        function (err, docs) {
          if (err) {
            console.log(err);
          } else {
            console.log("Updated: ", docs);
          }
        }
      );
      res.json("Book of the month Updated");
    } else {
      const newMonthly = new thisMonthsBook({
        sharerId,
        productNum: prodNum,
        title: name,
        genre: genren,
      });

      const bookRes = await newMonthly.save();
      console.log(bookRes);
      res.json({
        bookRes,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/getMonthly", async (req, res) => {
  try {
    const token = req.header("x-auth-token"); //grab token
    data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!token) return res.json(false);
    if (!user) return res.json(false);

    let uid = data.id;

    let bookExists = await thisMonthsBook.find({ sharerId: uid }).exec();

    if (uid) {
      res.json({
        bookExists,
      });
    } else {
      res.json({});
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//deletes monthlybook
router.delete("/buyCurrentMonthlyBook", auth, async (req, res) => {
  try {
    const deleteCurrentMonthlyBook = await Notif.findByIdAndDelete(
      req.body.nid
    );
    res.json(deleteCurrentMonthlyBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//router.

module.exports = router;
