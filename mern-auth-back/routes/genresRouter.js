const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const genres = require("../models/genresModel"); //require genresModel

router.post("/createGenre", async (req, res) => { //when /createGenre is requested this will be run
    try{
        const {genreID, genre, description} = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode    
        let userID = data.id.toString(); 
        const possibleGenre = await Genre.find({genre:genre}).exec(); //look for a genre with the same name as value passed in body
        if(possibleGenre.length==0){ //if it doesn't exist, create a new genre 
            const newGenre = new Genre({
                genreID,
                genre,
                description
            }); //create a new genre record
            const genreRecord = await newGenre.save(); // save the record
            res.json(genreRecord); //send back the new record
        }else{
            res.json("A genre with this name already exists")
        }
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/createGenre" //This route creates a new genre record.
// Must pass genreID, genre, description in body

router.get("/getGenre", async (req, res) => { //when /getGenre is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        let did = req.query.did; //send a did in the query with the genreID as the value
        const genre = await Genre.find({genreID:did}).exec(); //grabs all genre records
        res.json(JSON.stringify(genre)) //sends back the records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getGenre" //This route gets a specific genre by the non-unique genreID passed in req.query.did

router.get("/getAllGenres", async (req, res) => { //when /getAllGenre is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const genres = await Genre.find({}).exec(); //grabs all genre records
        res.json(JSON.stringify(genres)) //sends back all genre records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getAllGenre" //This route gets all genre records

router.delete("/deleteGenre", auth, async(req, res) =>{ //when /deleteGenre is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const deletedGenre = await Genre.findByIdAndDelete(req.body.fid); //passing db id of genre, in body, finding and deleting it
        res.json(deletedGenre); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.delete("/deleteGenre" //This route will delete a genre record
//Pass the unique databaseID of the genre record in req.body.fid to delete it

module.exports = router;

//routes to make


