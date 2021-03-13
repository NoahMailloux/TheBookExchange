import React, { useEffect, useContext, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";

export default function SearchBookForm({props}) {
  const [searchResults, setSearchResults] = useState();
  const [search, setSearch] = useState();
  const [bTitle, setTitle] = useState();
  const [bImage, setImage] = useState();
  const [bAuthor, setAuthor] = useState();
  const [bProdID, setProdID] = useState();

  const submit = async (e) => {
    e.preventDefault()
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
    console.log(data.data)
      let parsedData = JSON.parse(data.data);
      parsedData = parsedData.results
      let filteredResults = []
      for (let element in parsedData) {
          if (parsedData[element].price && parsedData[element].price <= 2000){
           filteredResults.push(parsedData[element]);
          }
      }
      setSearchResults(parsedData);
    });
  };
  //turn the map into a function that loops through the search results object and if the price is there and also less than $20, add an element for it
  return (
    <>
      {searchResults ? (
        searchResults.map((x) => (
            <form>
             <img src={x.image}/>
            </form>
          ))
      ) : (
        <form className="bomform" onSubmit={submit}>
          <input
            type="text"
            placeholder="Search for a book"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Select Genre" />
        </form>
      )}
    </>
  );
}
