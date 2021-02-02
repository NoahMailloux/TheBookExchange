const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const books = require("../../models/testModels/booksModel"); //require booksModel

router.post("/addBook", async (req, res) => { //when /addBook is requested this will be run
    try{
        const {bookID, name, genre_id, rating, price, author, synopsis} = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const newBook = new Book({
            bookID,
            name,
            genre_id,
            rating,
            price,
            author,
            synopsis
        }); //create a new Book record
        const Book = await newBook.save(); // save the record
        res.json(Book); //send back the new book record
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/addBook" //this route will add a book to the db 

router.get("/getAllBooks", async (req, res) => { //when /getAllBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        let did = req.query.did; // did is database generated unique ID
        try{
            const books = await Book.find({bookID:did}).exec(); //grabs all book records
            res.json(JSON.stringify(books)) //sends back all book records
        }catch(ex){
            // execution continues here when an error was thrown. You can also inspect the `ex`ception object
        }
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/getAllBooks" //this route sends back all book records

router.get("/getBook", async (req, res) => { //when /myFollows is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        let did = req.query.did; // did is database generated unique ID
        try{
            const myBooks = await Book.find({bookID:did}).exec(); //grabs all sharedBooks for a specific user
            res.json(JSON.stringify(myBooks)) //sends back all sharedBooks records
        }catch(ex){
            // execution continues here when an error was thrown. You can also inspect the `ex`ception object
        }
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/getBook" //this route sends back a record for a specfic book

router.delete("/deleteBook", auth, async(req, res) =>{ //when /unFollow is requested this will be run
    try{
        console.log(req);
        const deletedBook = await Book.findByIdAndDelete(req.body.fid); //passing db id of book, in body, finding and deleting it
        res.json(deletedFollow); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.post("/deleteBook" //this route will delete a book

module.exports = router;

