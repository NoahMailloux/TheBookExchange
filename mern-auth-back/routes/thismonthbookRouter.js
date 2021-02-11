const router = require("express").Router();
const auth = require("../middleware/auth");
const thisMonthsBook = require("../models/thismonthsbookmodel");
const jwt = require("jsonwebtoken");


// current book

router.post("/monthly", async (req, res) => {
    try {

        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if(!token) return res.json(false);
        if(!user) return res.json(false);


        let bookId = req.body.bookId
        let sharerId = data.id
        let productNum = req.body.productNum

        const newMonthly = new thisMonthsBook ({
            bookId,
            sharerId,
            productNum
        });

        const newmonthly = await newMonthly.save();


        res.json({
            newMonthly
        })
    }catch(err){
        res.status(500).json({error: err.message});

    }

});



//deletes monthlybook 
router.delete("/buyCurrentMonthlyBook", auth, async (req, res) => {

    try{
        
        const deleteCurrentMonthlyBook = await Notif.findByIdAndDelete(req.body.nid);
        res.json(deleteCurrentMonthlyBook);

    }
    catch(err){
        res.status(500).json({error: err.message});
    }


})

//router.

module.exports = router;