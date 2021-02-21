import React, { useEffect, useContext, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";
import "./genres.css";

export default function Genres() {
  const [genres, setGenres] = useState({});
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

  useEffect(() => {
    if (userData.userData.token) {
      //console.log(userData.userData.token);
      Axios.get("http://localhost:5001/genres/getAllGenres", {
        headers: {
          "x-auth-token": userData.userData.token,
          "Content-Type": "text/json",
        },
      }).then((data) => {
        let temp = ["Select a Genre from the list..."];
        let parsedData = JSON.parse(data.data);
        console.log(parsedData);
        for (const index in parsedData) {
          temp.push(parsedData[index].genre);
          //console.log(temp)
        }
        console.log(JSON.stringify(temp));
        setGenres(temp);
      });
    }
  }, [userData]);

  if (!userData) return null;

  let g = [];
  if (genres.length > 0) {
    g = Object.values(genres);
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
              g.map((x) => (
                <option key={x} value={x}>
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
