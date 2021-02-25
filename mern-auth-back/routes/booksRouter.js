const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Books = require("../models/booksModel"); //require booksModel
const SharedBooks = require("../models/sharedBooksModel"); //require sharedBooksModel

router.post("/addBook", async (req, res) => { //when /addBook is requested this will be run
    try{
        const {bookID, name, genreID, rating, price, author, synopsis, bookUrl} = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const newBook = new Book({
            bookID,
            name,
            genreID,
            rating,
            price,
            author,
            synopsis,
            bookUrl
        }); //create a new Book record
        const BookOut = await newBook.save(); // save the record
        res.json(BookOut); //send back the new book record
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/addBook" //This route creates a new book record.
// Must pass name, genreID, rating, price, author, synopsis in body

router.get("/myBooks", async (req, res) => { //when /myBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const myBooks = SharedBook.find({receiverID:data.id}).exec(); //grabs all sharedBooks for the currently logged in user by reciverID
        booksArray = []

        
       // myBooks.forEach(element => {
            //booksArray.push(element.bookID) 
         //   const books = Books.find({bookID:element.bookID}).exec();
        //    booksArray.push(books)
       // });


        //loop through my books
        //database query grab book info for each bookID

        res.json(JSON.stringify(booksArray)) //sends back all sharedBooks records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/myBooks" //This route grabs the list of books the currently logged in user has shared 


router.get("/getBook", async (req, res) => { //when /myFollows is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        let did = req.query.did; // did is database generated unique ID
        const myBooks = await Book.find({name:did}).exec(); //grabs all books for a specific name
        res.json(JSON.stringify(myBooks)) //sends back all sharedBooks records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getBook" //This route gets a specific book by the non-unique bookID passed in req.query.did
//

router.get("/getAllBooks", async (req, res) => { //when /getAllBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const books = await Book.find({}).exec(); //grabs all book records
        res.json(JSON.stringify(books)) //sends back all book records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getAllBooks" //This route sends back all book records

router.delete("/deleteBook", auth, async(req, res) =>{ //when /unFollow is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const deletedBook = await Book.findByIdAndDelete(req.body.fid); //passing db id of book, in body, finding and deleting it
        res.json(deletedBook); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.delete("/deleteBook" //this route will delete a book

module.exports = router;

