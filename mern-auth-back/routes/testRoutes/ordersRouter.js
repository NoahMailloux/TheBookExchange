const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const User = require("../../models/userModel");
const orders = require("../../models/testModels/ordersModel"); //require ordersModel

router.post("/", async (req, res) => { //when / is requested this will be run
    try{
        
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.post("/" //this route 

router.post("/createOrder", async (req, res) => { //when /createOrder is requested this will be run
    try{
        const {orderID, address, tracking_num, price, product_num, status} = req.body; //grab info from body
        const token = req.header("x-auth-token"); //grab token
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
}); // end router.post("/createOrder" //this route creates a new order record

router.get("/getAllOrders", async (req, res) => { //when /getAllOrders is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const orders = await Order.find().exec(); //grabs all shared order records 
        res.json(JSON.stringify(orders)) //sends back all order records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getAllOrders" //this route sends back all orders records

router.get("/getOrder", async (req, res) => { //when /getOrder is requested this will be run
    try{
        //auth check
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified) return res.json(false);
        const user = await User.findById(verified.id);
        if(!token) return res.json(false);
        if(!user) return res.json(false);
        //end of auth check
        let did = req.query.did;//send a did in the query with the orderID as the value
        const orders = await Order.find({_id:did}).exec(); //grabs all order records
        res.json(JSON.stringify(orders)) //sends back all order records 
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getOrder" //this route sends back all orders for a specific order ID

router.get("/getUserOrders", async (req, res) => { //when /getUserOrders is requested this will be run
    try{
        const token = req.header("x-auth-token"); //grab token
        data = jwt.decode(token,process.env.JWT_SECRET); // verify & decode
        const userOrders = await Order.find({userID:data.id}).exec(); //grabs all order records for a specific user
        res.json(JSON.stringify(userOrders)) //sends back the records
    }catch(err){
        res.status(500).json({error: err.message});
    } //end try,catch
}); // end router.get("/getUserOrders" //this route finds all orders for a specific user

router.delete("/deleteOrder", auth, async(req, res) =>{ //when /deleteOrder is requested this will be run
    try{
        console.log(req);
        const deletedOrder = await Order.findByIdAndDelete(req.body.fid); //passing db id, in body, of order, finding and deleting it
        res.json(deletedOrder); //send back deleted obj record
    }catch(err){
        res.status(500).json({error: err.message});
    }
}); // end router.delete("/deleteOrder" //this route deletes an order

module.exports = router;
