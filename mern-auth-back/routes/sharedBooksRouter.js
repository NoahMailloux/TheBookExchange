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
        const myBooks = await SharedBook.find({sharerID:data.id}).exec(); //grabs all sharedBooks for the currently logged in user
        res.json(JSON.stringify(myBooks)) //sends back all sharedBooks records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/mySharedBooks" //This route grabs the list of books the currently logged in user has shared 


//broken ..... code below is notes for issue
router.get("/shareBook", async (req, res) => {
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        //const editShareBook = await SharedBook.find({ bookID: req.body.book_id, sharerID: data.id}).exec();
       // editShareBook.receiverID = req.body.receiver_id;

        const query = { bookID: req.body.book_id, sharerID: data.id };
        SharedBook.findOneAndUpdate(query, { receiverID:  req.body.receiver_id}, null, null)
        //SharedBook.findOneAndUpdate(query, { $set: { receiverID: req.body.receiver_id }}, null, null)
        res.json("Got here") //sends back update confirm
    }catch(err){
        
        res.status(500).json({error: err.message});
    }
});  // end router.route("/shareBook").post //This route updates a sharedBook record

module.exports = router;

//^^
//make "share book" (updates reciever in record) route (take shareID(_id) and recieverID and add new rec)
// shareID, recieverID in post body
//update record where shareID = shareID in body. Update the recieverID where recieverID = recieverID in body.
    //    const sharer = await SharedBook.find({sharerID:did}).exec(); //grabs specific sharedBook record 
     //   SharedBook.findByIdAndUpdate(
        //    { _id: sharer }, // value of the _id field
         //   { receiverID: res.body }, //update
         //   function(err, result) {
        //      if (err) {
          //      res.send(err);
         //     } else {
        //        res.send(result);
         //     }
        //    }
        //  ); 


        // SharedBook.findByIdAndUpdate(sharerID, { receiverID: req.body.did }, //find the logged in users shareBook record and updates the reciever.
          //  function (err, docs) { 
          //  if (err){ 
         //   console.log(err) 
         //   } 
         //   else{ 
         //   console.log("Updated Reciever: ", docs); 
         //   } 
         //   }); 


