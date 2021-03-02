const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const SharedBooks = require("../models/sharedBooksModel"); //require sharedBooksModel

router.post("/addSharedBook", async (req, res) => { //when /addSharedBook is requested this will be run
    try{
        const {bookID, receiverID } = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        var currentdate = new Date(); 
        var lastUpdated = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); //grabs current dateTime
        lastUpdated.toString(); //save as string
        let sharerID = data.id.toString(); 
        const newShareBook = new SharedBook({
            bookID,
            sharerID,
            receiverID,
            lastUpdated
        }); //create a new SharedBook record
        const shareBook = await newShareBook.save(); // save the record
        res.json(shareBook); //send back the new shared book record
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/addSharedBook" //This route creates a new shared book record
//Pass the bookID followed by the receiverID in req.body


router.get("/getAllSharedBooks", async (req, res) => { //when /getAllSharedBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const books = await SharedBook.find().exec(); //grabs all shared book records by bookID
        res.json(JSON.stringify(books)) //sends back all shared book records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getAllSharedBooks" //This route sends back all shared book records


router.get("/mySharedBooks", async (req, res) => { //when /mySharedBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const myBooks = await SharedBook.find({receiverID:data.id}).exec(); //grabs all sharedBooks for the currently logged in user by receiverID
        //res.json(JSON.stringify(myBooks)) //sends back all sharedBooks records  
        let bookIDsArray = [];//blank array    
        for (const index in myBooks){
            const books = await Book.find({bookID:myBooks[index].bookID}).exec(); //grab the book by the bookID we got from previous call
            bookIDsArray.push(books); //add to array
        }
        res.json({bookIDsArray});
        //res.json(JSON.stringify(bookIDsArray))   
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/mySharedBooks" //This route grabs the list of books that have been shared with the currently logged in user (by receiverID)

router.delete("/deleteSharedBook", auth, async(req, res) =>{ //when /deleteSharedBook is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const deletedSharedBook = await SharedBooks.findByIdAndDelete(req.body.fid); //passing db id, in body, of shared book, finding and deleting it
        res.json(deletedSharedBook); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.delete("/deleteSharedBook" //This route will delete a shared book record 
//Pass the unique databaseID of the shared book record in req.body.fid to delete it


module.exports = router;

