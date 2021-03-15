import React, { useEffect, useContext, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";
import "./SearchBookForm.css";

export default function SearchBookForm({ props }) {
  const [searchResults, setSearchResults] = useState();
  const [search, setSearch] = useState();
  const userData = useContext(UserContext);
  const history = useHistory();
  const [genre, setGenre] = useState();
  const [genres, setGenres] = useState({}); //use state to setGenres and store genres outside of useEffect
  const [message, setMessage] = useState();

  useEffect(() => {
    //when component renders run this
    if (userData.userData.token) {
      //console.log(userData.userData.token);
      Axios.get("http://localhost:5001/genres/getAllGenres", {
        //this is an axios get requires route and headers, Axios post require route, null, headers in that order
        headers: {
          "x-auth-token": userData.userData.token,
          "Content-Type": "text/json",
        },
      }).then((data) => {
        //after something is returned, store in data
        let temp = ["Select a Genre from the list..."]; //this is an array I made to store the genres "Select a Genre from the list..." was made to be the first thing user sees in dropdown
        let parsedData = JSON.parse(data.data); //this will convert the data back into an object since axios returns only a string
        console.log(parsedData);
        for (const index in parsedData) {
          //for each index in the array of objects
          temp.push(parsedData[index].genre); //access data in parsed data via the index
          //console.log(temp)
        }
        console.log(JSON.stringify(temp));
        setGenres(temp); //use state to set genres
      });
    }
  }, [userData]);

  const submit = async (e) => {
    e.preventDefault();
    setSearchResults(null);
    console.log(props);
    //console.log(userData.userData.token);
    Axios.get("http://localhost:5001/zinc/searchBook", {
      //this is an axios get requires route and headers, Axios post require route, null, headers in that order
      headers: {
        search: search,
        "x-auth-token": props,
        "Content-Type": "text/json",
      },
    }).then((data) => {
      //console.log(data.data)
      let parsedData = JSON.parse(data.data);
      parsedData = parsedData.results;
      let filteredResults = [];
      for (let element in parsedData) {
        if (
          parsedData[element].price &&
          parsedData[element].price <= 2000 &&
          parsedData[element].title &&
          parsedData[element].product_id &&
          parsedData[element].brand
        ) {
          //console.log(parsedData[element].price + parsedData[element].title)
          filteredResults.push(parsedData[element]);
        }
      }
      console.log(filteredResults);
      setSearchResults(filteredResults);
    });
  };

  const addBook = (productNum, title) => {
    if (genre) {
      console.log(genre);
      console.log(userData.userData);
      let token = userData.userData.token;
      let res = Axios.post("http://localhost:5001/monthlybook/monthly", {
        token,
        productNum,
        title,
        genre
      });
      console.log(addBook)
      // eslint-disable-next-line no-restricted-globals
     
    }
    else {
      setMessage("Please Select a Genre");
    }
  };

  let g = []; //empty array because we can only access data via an array with JSX
  if (genres.length > 0) {
    //if there are genres..
    g = Object.values(genres); //take all the values in genres and store into array g
  }

  //turn the map into a function that loops through the search results object and if the price is there and also less than $20, add an element for it
  return (
    <>
      {message}
      {searchResults ? (
        <>
          <form className="bomform" onSubmit={ submit }>
            <input
              type="text"
              placeholder="Search for a book"
              onChange={(e) => setSearch(e.target.value)}
            />
            <input type="submit" value="Search" />
          </form>
          {searchResults.map((x) => (
            <form
              className="Book-Result"
              onSubmit={(e) => {
                addBook(x.product_id, x.title);
              }}
            >
              <img className="searchbook" src={x.image} />
              <div className="book-info">
                <h3 className="title"> Title: {x.title}</h3>
                <h3 className="author">Author: {x.brand}</h3>
              </div>
              <select
                placeholder="select a Genre"
                name="genres"
                className="genres-dd"
                onChange={(e) => setGenre(e.target.value)}
              >
                {
                  (console.log(g),
                  g.map((
                    x //map g, will loop through each value in the array and store it in x
                  ) => (
                    <option key={x} value={x /*access value using x*/}>
                      {x}
                    </option>
                  )))
                }
              </select>
              <input className="add" type="submit" value="Select Book" />
            </form>
          ))}
        </>
      ) : (
        <form className="bomform" onSubmit={submit}>
          <input
            type="text"
            placeholder="Search for a book"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
      )}
    </>
  );
}
