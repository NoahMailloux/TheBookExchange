const express = require("express"); //connect express
const mongoose = require("mongoose"); //connect mongoose
const cors = require("cors") //connect cors
require("dotenv").config(); //conect dotenv

//set up express

const app = express(); //created express app that we can interact with
app.use(express.json()) //setup json bodyparser to read json objs from requests sent to express
app.use(cors()); //enable cors resource sharing

const PORT = process.env.PORT || 5001; 
//assigned enviornment PORT variable from host server, if this is sent online it will check there first
//if it's run locally it will use port 5000

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`)); // start server and log success.

//set up mongoose, mongoose will connect us to mongoDB

mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING, 
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err) => {
      if (err) throw err;
      console.log("MongoDB connection established");  
    });

    // set up routes
  

    app.use("/users", require("./routes/userRouter")); //if were on /users it will require the middleware
    app.use("/discussion", require("./routes/testRoutes/ericktemproutes"));
    app.use("/discussionFollows", require("./routes/testRoutes/discussionFollowsRouter"));
    app.use("/sharedBooks", require("./routes/testRoutes/sharedBooksRouter"));
    app.use("/notifications", require("./routes/testRoutes/notificationRouterTest"));
    app.use("/books", require("./routes/testRoutes/booksRouter"));
    app.use("/genres", require("./routes/testRoutes/genresRouter"));
    app.use("/orders", require("./routes/testRoutes/ordersRouter"));