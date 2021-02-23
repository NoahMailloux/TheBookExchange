import React, { useEffect, useContext, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";
import "./genres.css";

export default function Genres() {
  const [genres, setGenres] = useState({});//use state to setGenres and store genres outside of useEffect
  const userData = useContext(UserContext);
  const history = useHistory();
  const [genre, setGenre] = useState();

  //form submit
  const submit = async (e) => {
    e.preventDefault();
    if(genre && genre != "Select a Genre from the list..." ) {
      console.log(genre)
    }
    else {console.log("Please select a Genre")}
  }

  useEffect(() => {//when component renders run this
    if (userData.userData.token) {
      //console.log(userData.userData.token);
      Axios.get("http://localhost:5001/genres/getAllGenres", {//this is an axios get requires route and headers, Axios post require route, null, headers in that order
        headers: {
          "x-auth-token": userData.userData.token,
          "Content-Type": "text/json",
        },
      }).then((data) => {//after something is returned, store in data
        let temp = ["Select a Genre from the list..."];//this is an array I made to store the genres "Select a Genre from the list..." was made to be the first thing user sees in dropdown
        let parsedData = JSON.parse(data.data);//this will convert the data back into an object since axios returns only a string
        console.log(parsedData);
        for (const index in parsedData) {//for each index in the array of objects
          temp.push(parsedData[index].genre);//access data in parsed data via the index
          //console.log(temp)
        }
        console.log(JSON.stringify(temp));
        setGenres(temp);//use state to set genres
      });
    }
  }, [userData]);//everytime userData changes rerender

  if (!userData) return null;//if there is no user data, render null aka a blank page

  let g = [];//empty array because we can only access data via an array with JSX
  if (genres.length > 0) {//if there are genres..
    g = Object.values(genres);//take all the values in genres and store into array g
  }

  return (
    <>
      <LoggedInHeader />
      <div className="page-contents">
        <h2>Genre of the month</h2>
        <p>
          This is where you will select an available genre that you are
          interested in!
        </p>
        <p>
          At the end of the month you will be sent a book based on this genre
          and hopefully have a stimulating conversation with people interested
          in this book!
        </p>
        <form className="genreOfMonthForm" onSubmit={submit}>
          <select placeholder="select a Genre" name="genres" className="genres-dd" onChange={(e) => setGenre(e.target.value)}>
            {
              (console.log(g),
              g.map((x) => (//map g, will loop through each value in the array and store it in x
                <option key={x} value={x/*access value using x*/}>
                  {x}
                </option>
              )))
            }
          </select>
          <input type="submit" value="Select Genre"/>
        </form>
      </div>
    </>
  );
}
