const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const SharedBooks = require("../../models/testModels/sharedBooksModel"); //require sharedBooksModel

router.post("/addBook", async (req, res) => { //when /addBook is requested this will be run
    try{
        const {bookID, sharerID, receiverID } = req.body; //grab info from body
        const token = req.header("auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        var currentdate = new Date(); 
        var lastUpdated = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); //grabs current dateTime
                lastUpdated.toString(); //save as string
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
}); // end router.post("/addBook" //this route creates a new shared book record


router.get("/getSharedBooks", async (req, res) => { //when /getSharedBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const existingUser = data.id;//grab current user
        let did = req.query.did; // did is database generated unique ID
        try{
            const books = await SharedBook.find({bookID:did}).exec(); //grabs all shared book records by bookID
            res.json(JSON.stringify(books)) //sends back all shared book records 
        }catch(ex){
            // execution continues here when an error was thrown. You can also inspect the `ex`ception object
        }
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/getSharedBooks" //this route sends back all shared book records


router.post("/MySharedBooks", async (req, res) => { //when /MySharedBooks is requested this will be run
    try{
        const token = req.header("auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const existingUser = data.id;//grab current user
        let did = req.query.did; // did is database generated unique ID
        try{
            const myBooks = await SharedBook.find({userID:did}).exec(); //grabs all sharedBooks for a specific user
            res.json(JSON.stringify(myBooks)) //sends back all sharedBookss records
        }catch(ex){
            // execution continues here when an error was thrown. You can also inspect the `ex`ception object
        }
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/MySharedBooks" //this route grabs the list of books a specific user has shared 

router.route("/shareBook").post(function(req, res) {
    let did = req.query.did; // did is database generated unique ID
    try{
        const sharer = /*await*/ SharedBook.find({sharerID:did}).exec(); //grabs specific sharedBook record 
        SharedBook.findByIdAndUpdate(
            { _id: sharer }, // value of the _id field
            { receiverID: res.body }, //update
            function(err, result) {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );
    }catch(err){
        res.status(500).json({error: err.message});
    }
});  // end router.post("/MySharedBooks" //this route updates a sharedBook record
//^^
//make "share book" (updates reciever in record) route (take shareID(_id) and recieverID and add new rec)
// shareID, recieverID in post body
//update record where shareID = shareID in body. Update the recieverID where recieverID = recieverID in body.




module.exports = router;