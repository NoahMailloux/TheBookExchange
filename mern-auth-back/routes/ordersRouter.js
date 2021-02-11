const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const orders = require("../models/ordersModel"); //require ordersModel

router.post("/createOrder", async (req, res) => { //when /createOrder is requested this will be run
    try{
        const {orderID, address, tracking_num, price, product_num, status} = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        var currentdate = new Date();
        var created_at = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds(); //grabs current dateTime
                created_at.toString(); 
        let userID = data.id.toString();
        const newOrder = new Order({
            address,
            tracking_num,
            price,
            product_num,
            userID,
            status,
            created_at
        }); //create a new order record
        const order = await newOrder.save(); // save the record
        res.json(order); //send back the new record
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/createOrder" //This route creates a new order record
// Must pass orderID, address, tracking_num, price, product_num, status in body

router.get("/getAllOrders", async (req, res) => { //when /getAllOrders is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const orders = await Order.find().exec(); //grabs all shared order records 
        res.json(JSON.stringify(orders)) //sends back all order records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getAllOrders" //This route sends back all orders records

router.get("/getOrder", async (req, res) => { //when /getOrder is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        let did = req.query.did;//send a did in the query with the orderID as the value
        const orders = await Order.find({_id:did}).exec(); //grabs all order records
        res.json(JSON.stringify(orders)) //sends back all order records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getOrder" //This route will find a order record
//Pass the unique databaseID of the order record in req.body.did to find it

router.get("/getUserOrders", async (req, res) => { //when /getUserOrders is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const userOrders = await Order.find({userID:data.id}).exec(); //grabs all order records for logged in user
        res.json(JSON.stringify(userOrders)) //sends back the records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getUserOrders" //This route returns all order records for the currently logged in user

router.delete("/deleteOrder", auth, async(req, res) =>{ //when /deleteOrder is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        if(!token) return res.json(false); //if no token, don't accept
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false); //if not a real token, don't accept
        const user = await User.findById(verified.id);
        if(!user) return res.json(false); //if token doesn't match a user, don't accept
        const deletedOrder = await Order.findByIdAndDelete(req.body.fid); //passing db id, in body, of order, finding and deleting it
        res.json(deletedOrder); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.delete("/deleteOrder" //This route will delete a order record 
//Pass the unique databaseID of the order record in req.body.fid to delete it

module.exports = router;
