const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const DiscussionFollows = require("../../models/testModels/sharedBooksModel"); //require sharedBooksModel

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


//this is broken
router.post("/getMySharedBooks", async (req, res) => { //when /getMySharedBooks is requested this will be run

    try{
        const token = req.header("auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const existingUser = data.id;//grab current user

        // find shared books record with id 

        var count = SharedBook.count();
        var stringDilm = "";
        var findSharedBook;
        for (var i =0; i < count; i++) {
        
            try{
                findSharedBook = await SharedBook.findOne({sharerID: i}); //find one sharedID where the id is = count 
            }catch(ex){
                 // execution continues here when an error was thrown. You can also inspect the `ex`ception object
            }
           
            if(findSharedBook.sharerID == data.id){
                stringDilm += "data.id" + ",";
            }//end if statement

        }//end for loop
        
      /*  var list = stringDilm?.split(",")
        if (list != null) {
            fName = list.get(0).toString()
            lName = list.get(1).toString()
            numOfBars = list.get(2).toString().toInt()
            typeOfChocolate =  list.get(3).toString()
            if (list.get(4).toString() == "true"){
                expedited = true;
            }else {
                expedited = false;
            }
        } */ //concept of how to retrieve list on front end
        
        res.json(stringDilm); //send back string containing list of books a user has shared 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch


}); // end router.post("/getMySharedBooks" //this route grabs the list of books a user has shared 

//2 routes to make

//make "get all shared book records" route

//make "share book" (updates reciever in record) route (take shareID(_id) and recieverID and add new rec)
// shareID, recieverID in post body
//update record where shareID = shareID in body. Update the recieverID where recieverID = recieverID in body.




module.exports = router;