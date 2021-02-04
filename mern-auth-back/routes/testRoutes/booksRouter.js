const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const Books = require("../../models/testModels/booksModel"); //require booksModel

router.post("/addBook", async (req, res) => { //when /addBook is requested this will be run
    try{
        const {name, genreID, rating, price, author, synopsis} = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const newBook = new Book({
            name,
            genreID,
            rating,
            price,
            author,
            synopsis
        }); //create a new Book record
        const BookOut = await newBook.save(); // save the record
        res.json(BookOut); //send back the new book record
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/addBook" //this route will add a book to the db 

router.get("/getAllBooks", async (req, res) => { //when /getAllBooks is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const books = await Book.find({}).exec(); //grabs all book records
        res.json(JSON.stringify(books)) //sends back all book records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getAllBooks" //this route sends back all book records

router.get("/getBook", async (req, res) => { //when /myFollows is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        let did = req.query.did; // did is database generated unique ID
        const myBooks = await Book.find({name:did}).exec(); //grabs all books for a specific name
        res.json(JSON.stringify(myBooks)) //sends back all sharedBooks records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getBook" //this route sends back a record for a specfic book

router.delete("/deleteBook", auth, async(req, res) =>{ //when /unFollow is requested this will be run
    try{
        console.log(req);
        const deletedBook = await Book.findByIdAndDelete(req.body.fid); //passing db id of book, in body, finding and deleting it
        res.json(deletedBook); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.delete("/deleteBook" //this route will delete a book

module.exports = router;

