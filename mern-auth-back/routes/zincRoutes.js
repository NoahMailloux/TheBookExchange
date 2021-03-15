const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const Genre = require("../models/genresModel");
const BooksToShare = require("../models/thismonthsbookmodel");
const Books = require("../models/booksModel");
const SharedBooks = require("../models/sharedBooksModel");
const Orders = require("../models/ordersModel");
const fetch = require("node-fetch");
const thismonthsbookmodel = require("../models/thismonthsbookmodel");

router.get("/searchBook", async (req, res) => {
  console.log(req.headers);
  const search = req.header("search"); //grab info from body
  const token = req.header("x-auth-token"); //grab token
  if (!token) return res.json("No token"); //if no token, don't accept
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) return res.json("false token"); //if not a real token, don't accept
  const user = await User.findById(verified.id);
  if (!user) return res.json("no user"); //if token doesn't match a user, don't accept
  data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode

  fetch(
    `https://api.zinc.io/v1/search?query=${search}%20Book&page=1&retailer=amazon`,
    {
      headers: {
        Authorization: "Basic QUE2NDNEMUNERkFDNTFGNTVENTlGODgwOiA=",
      },
    }
  )
    .then((res) => res.text())
    .then((text) => {
      res.json(text);
    });
});

router.get("/orderAllBooks", async (req, res) => {
  const token = req.header("x-auth-token"); //grab token
  if (!token) return res.json("No token"); //if no token, don't accept
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  if (!verified) return res.json("false token"); //if not a real token, don't accept
  const user = await User.findById(verified.id);
  if (!user) return res.json("no user"); //if token doesn't match a user, don't accept
  data = jwt.decode(token, process.env.JWT_SECRET); // verify & decode

  let users = await User.find().exec();
  let userInfo = [];
  let followedGenres = [];
  let booksToShare = [];
  let genres = [];
  let tempGenre = "";
  let tempBook = "";
  let temp = await Genre.find().exec();
  let countGenres = [];
  let books = await SharedBooks.find();
  let unEvenGenres = [];
  //innitialize an array of objects to count each subscriber for each genre
  for (g in temp) {
    countGenres.push({
      genre: temp[g].genre,
      count: 0,
    });
  }

  for (i in temp) {
    genres.push(temp[i].genre);
  }

  //for every user get their subscribed genre and id and assign a random subscribed genre if not
  for (element in users) {
    //check for subscribed genre if none, add a random one
    if (!users[element].subscribedGenre) {
      tempGenre = genres[getRandomInt(genres.length)];
    } else {
      tempGenre = users[element].subscribedGenre;
    }
    let checkforbook = await BooksToShare.find({
      sharerId: users[element]._id,
    }).exec();
    //if the user is sharing a book add to user info for this cycle and add a counter for subscribed length
    if (checkforbook.length != 0) {
      userInfo.push({
        id: users[element]._id,
        genre: tempGenre,
        bookToRecieve: "",
        address: users[element].address,
        zip: users[element].postCode,
        city: users[element].city,
        state: users[element].state,
      });
    }
  }
  console.log(userInfo);

  for (element in userInfo) {
    //search for the genre and add 1 to the count if the user has shared a book this month
    for (g in countGenres) {
      if (userInfo[element].genre == countGenres[g].genre)
        countGenres[g].count++;
    }
  }

  //eliminate genres with 0 followers
  for (i in countGenres) {
    console.log(countGenres[i].genre + countGenres[i].count);
    if (countGenres[i].count == 0) {
      delete countGenres[i];
    }
  }
  console.log("Counted Genres:");
  console.log(countGenres);

  for (g in countGenres) {
    if (countGenres[g].count % 2 != 0)
      unEvenGenres.push(
        countGenres[g].genre + " has an uneven amount of Subscribers"
      );
  }

  let tempBooks = await thismonthsbookmodel.find().exec();
  let genreBookCount = [];

  for (b in tempBooks) {
    let t = genreBookCount.filter((obj) => {
      return obj.genre == tempBooks[b].genre;
    });

    if (t.length > 0) {
      for (g in genreBookCount) {
        if (genreBookCount[g].genre == tempBooks[b].genre) {
          genreBookCount[g].count++;
        }
      }
    } else {
      genreBookCount.push({
        genre: tempBooks[b].genre,
        count: 1,
      });
    }
  }
  console.log("Counted Book Genres");
  console.log(genreBookCount);
  let unevenBookGenres = [];
  for (g in genreBookCount) {
    if (genreBookCount[g].count % 2 != 0) {
      unevenBookGenres.push(
        genreBookCount[g].genre + " Has an uneven amount of books"
      );
    }
  }
  if (unEvenGenres.length > 0 && unevenBookGenres.length > 0) {
    res.json({ unevenBookGenres, unEvenGenres });
  } else if (unEvenGenres.length > 0) {
    res.json(unEvenGenres);
  } else if (unevenBookGenres.length > 0) {
    res.json(unevenBookGenres);
  } else {
    let x = [];
    let error = [];
    for (i in genreBookCount) {
      x = countGenres.filter((obj) => {
        return obj.genre == genreBookCount[i].genre;
      });
      console.log("x:");
      console.log(x);
      console.log(genreBookCount[i]);
      if (x.length > 0 && x[0].count != genreBookCount[i].count) {
        error.push(
          "There are not enough people subscribed to " +
            genreBookCount[i].genre +
            " for the amount ofbooks"
        );
        error.push(
          "Book Count: " +
            genreBookCount[i].count +
            " Subscribers count: " +
            x[0].count
        );
      } else if (x.length == 0) {
        error.push("No subscribers for " + genreBookCount[i].genre);
      }
    }
    for (i in countGenres) {
      x = genreBookCount.filter((obj) => {
        return obj.genre == countGenres[i].genre;
      });
      if (x.length > 0 && x[0].count != countGenres[i].count) {
        error.push(
          "There are not enough people subscribed to " +
            genreBookCount[i].genre +
            " for the amount ofbooks"
        );
        error.push(
          "Book Count: " +
            genreBookCount[i].count +
            " Subscribers count: " +
            x[0].count
        );
      } else if (x.length == 0) {
        error.push("No Books for Genre " + countGenres[i].genre);
      }
    }

    if (error.length > 0) {
      return res.json(error);
    }
    let test = 1;
    let r = ["filler"];
    let rnum = 0;
    for (e in userInfo) {
      test = 1;
      while (test) {
        rnum = getRandomInt(tempBooks.length);
        r = userInfo.filter((obj) => {
          return obj.bookToRecieve == tempBooks[rnum].productNum;
        });

        if (
          r.length == 0 &&
          userInfo[e].genre == tempBooks[rnum].genre &&
          tempBooks[rnum].sharerId != userInfo[e].id
        ) {
          console.log(tempBooks[rnum].title + userInfo[e].genre);
          userInfo[e].bookToRecieve = tempBooks[rnum].productNum;
          test = 0;
        }
      }
      console.log(
        "userinfo: " +
          userInfo[e].genre +
          "random book: " +
          tempBooks[rnum].genre
      );
    }

    let responses = [];
    for (entry in userInfo) {
      fetch(`https://api.zinc.io/v1/order`, {
        body: {
          retailer: "amazon",
          products: [
            {
              product_id: userInfo[entry].bookToRecieve,
              quantity: 1,
            },
          ],
          max_price: 0,
          shipping_address: {
            first_name: "The Book Exchange",
            last_name: "Project",
            address_line1: userInfo[entry].address,
            address_line2: "",
            zip_code: userInfo[entry].zip,
            city: userInfo[entry].city,
            state: userInfo[entry].state,
            country: "US",
            phone_number: "6104158346",
          },
          is_gift: false,
          shipping: {
            order_by: "price",
            max_days: 5,
            max_price: 1000,
          },
          payment_method: {
            name_on_card: "Lee Warner",
            number: "5565585034129087",
            security_code: "037",
            expiration_month: 11,
            expiration_year: 2020,
            use_gift: false,
          },
          billing_address: {
            first_name: "The Book Exchange",
            last_name: "Project",
            address_line1: userInfo[entry].address,
            address_line2: "",
            zip_code: userInfo[entry].zip,
            city: userInfo[entry].city,
            state: userInfo[entry].state,
            country: "US",
            phone_number: "6104158346",
          },
          retailer_credentials: {
            email: "firewing3644@gmail.com",
            password: "password",
          },
        },
        headers: {
          Authorization: "Basic QUE2NDNEMUNERkFDNTFGNTVENTlGODgwOiA=",
        },
        method: "POST",
      })
        .then((res) => res.text())
        .then((text) => {
          console.log(text);
          responses.push(text);
        });
    }
    console.log(responses);



    res.json({ userInfo });
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
});

module.exports = router;
