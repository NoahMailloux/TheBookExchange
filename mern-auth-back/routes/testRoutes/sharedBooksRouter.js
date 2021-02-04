const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const SharedBooks = require("../../models/testModels/sharedBooksModel"); //require sharedBooksModel

router.post("/addSharedBook", async (req, res) => { //when /addSharedBook is requested this will be run
    try{
        const {bookID, receiverID } = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
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
}); // end router.post("/addSharedBook" //this route creates a new shared book record


router.get("/getAllSharedBooks", async (req, res) => { //when /getAllSharedBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const books = await SharedBook.find().exec(); //grabs all shared book records by bookID
        res.json(JSON.stringify(books)) //sends back all shared book records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getAllSharedBooks" //this route sends back all shared book records


router.get("/mySharedBooks", async (req, res) => { //when /mySharedBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const myBooks = await SharedBook.find({sharerID:data.id}).exec(); //grabs all sharedBooks for a specific user
        res.json(JSON.stringify(myBooks)) //sends back all sharedBooks records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/mySharedBooks" //this route grabs the list of books a specific user has shared 


//broken
router.get("/shareBook", async (req, res) => {
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        //let did = req.query.did; //send a did in the query with the bookID as the value
        //var user_id = data.id; //grabs the users auto generated id from the token
        const editShareBook = await SharedBook.find({ bookID: req.body.book_id, sharerID: data.id}).exec();
        editShareBook.receiverID = req.body.receiver_id;
       
        // SharedBook.findByIdAndUpdate(sharerID, { receiverID: req.body.did }, //find the logged in users shareBook record and updates the reciever.
          //  function (err, docs) { 
          //  if (err){ 
         //   console.log(err) 
         //   } 
         //   else{ 
         //   console.log("Updated Reciever: ", docs); 
         //   } 
         //   }); 
            res.json(JSON.stringify(myBooks))
           // res.json("Book shared") //sends back update confirm
    }catch(err){
        
        res.status(500).json({error: err.message});
    }
});  // end router.route("/shareBook").post //this route updates a sharedBook record
//^^
//make "share book" (updates reciever in record) route (take shareID(_id) and recieverID and add new rec)
// shareID, recieverID in post body
//update record where shareID = shareID in body. Update the recieverID where recieverID = recieverID in body.

module.exports = router;