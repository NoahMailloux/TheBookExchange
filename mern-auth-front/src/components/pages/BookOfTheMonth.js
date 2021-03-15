import React, { useEffect, useContext, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";
import "./BookOfTheMonth.css";
import "../forms/SearchBookForm";
import SearchBookForm from "../forms/SearchBookForm";

export default function BookOfTheMonth() {
  const [genres, setGenres] = useState({}); //use state to setGenres and store genres outside of useEffect
  const userData = useContext(UserContext);
  const history = useHistory();
  const [title, setTitle] = useState();
  const [searchResults, setSearchResults] = useState();
  const [accountStatus, setAccountStatus] = useState();

  useEffect(() => {
    //when component renders run this
    if (userData.userData.token) {
      Axios.get("http://localhost:5001/monthlybook/getMonthly", {
        //this is an axios get requires route and headers, Axios post require route, null, headers in that order
        headers: {
          "x-auth-token": userData.userData.token,
          "Content-Type": "text/json",
        },
      }).then((data) => {
        let temp = null;
        if (data.data.bookExists.length != 0) {
          temp = data.data.bookExists[0].title;
        } else {
          temp = "Please select a book for this month!";
        }
        setTitle(temp); //use state to set genres
      });
    }
  }, [userData]); //everytime userData changes rerender

  if (!userData) return null; //if there is no user data, render null aka a blank page

  let g = []; //empty array because we can only access data via an array with JSX
  if (genres.length > 0) {
    //if there are genres..
    g = Object.values(genres); //take all the values in genres and store into array g
  }

  return (
    <>
      <LoggedInHeader />
      <div className="page-contents">
        <h2>Book Of The Month</h2>
        <p>
          This is where you will select what book you want to share with our
          other readers this month!
        </p>
        <p>
          You can select any book you have found interesting, just search for a
          book and select the genre!
        </p>
        <p>Current Book: {title}</p>
        <SearchBookForm props={userData.userData.token} />
      </div>
    </>
  );
}
