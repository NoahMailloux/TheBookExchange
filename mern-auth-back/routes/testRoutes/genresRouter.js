const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const genres = require("../../models/testModels/genresModel"); //require genresModel

router.post("/createGenre", async (req, res) => { //when /createGenre is requested this will be run
    try{
        const {genreID, genre, description} = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode    
        let userID = data.id.toString(); // !!!!!!!!!!!!!!!!!! this cant be right !!!!!!!!!!!!!!!!!!!!!
        const newGenre = new Genre({
            genreID, // !!!!!!!!!!!!!!!!!! this cant be right !!!!!!!!!!!!!!!!!!!!!
            genre,
            description
        }); //create a new genre record
        const genreRecord = await newGenre.save(); // save the record
        res.json(genreRecord); //send back the new record
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/createGenre" //this route creates a new genre record

router.get("/getGenre", async (req, res) => { //when /getGenre is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        let did = req.query.did; //send a did in the query with the genreID as the value
        const genre = await Genre.find({genreID:did}).exec(); //grabs all genre records
        res.json(JSON.stringify(genre)) //sends back the records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getGenre" //this route gets a specific genre !!!!!!BY GENRE ID!!!!

router.get("/getAllGenres", async (req, res) => { //when /getAllGenre is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const genres = await Genre.find({}).exec(); //grabs all genre records
        res.json(JSON.stringify(genres)) //sends back all genre records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getAllGenre" //this route gets all genre records

router.delete("/deleteGenre", auth, async(req, res) =>{ //when /deleteGenre is requested this will be run
    try{
        console.log(req);
        const deletedGenre = await Genre.findByIdAndDelete(req.body.fid); //passing db id of genre, in body, finding and deleting it
        res.json(deletedGenre); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.delete("/deleteGenre" //this route will delete a genre

module.exports = router;

//routes to make


