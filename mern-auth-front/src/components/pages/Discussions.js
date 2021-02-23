import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import "./Discussions.css";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";

export default function Discussions() {
  const [discussions, setDiscussions] = useState({});
  const [books, setbooks] = useState({});

  const userData = useContext(UserContext);
  const history = useHistory();

  //http://localhost:5001/discussion/listdiscussions
  useEffect(() => {
    if (userData.userData.token) {
      //console.log(userData.userData.token);
      Axios.post("http://localhost:5001/discussion/listdiscussions", null, {
        headers: {
          "x-auth-token": userData.userData.token,
          "Content-Type": "text/json",
        },
      }).then((data) => {
        let parsedData = JSON.parse(data.data);
        console.log(parsedData);
        let titles = [];
        let bookNames = [];
        for (const index in parsedData) {
          //this loops through every single index withing the array of objects
          titles.push(parsedData[index].title); //push the title for each index in the array, parsed data into titles array
          bookNames.push(parsedData[index].book);
          console.log(JSON.stringify(parsedData[index].title));
        }
        setbooks(bookNames);
        setDiscussions(titles);
      });
    }
  }, [userData]);
  let count = 0;
  let titleArray = []; //Since JSX doesnt allow objects we have to access discussions via an array
  let bookNamesArray = [];
  if (discussions.length > 0) {
    titleArray = Object.values(discussions);
    bookNamesArray = Object.values(books)
  }
  function addToCount(){
    count++
    return bookNamesArray[count -1]
  }

  if (!userData) return null;

  const elements = ["one", "two", "three", "four"];
  const elements2 = ["5", "6", "7", "8"];
  return (
    <body id="bodycolor">
      <div>
        <LoggedInHeader />
        {
          (
          titleArray.map((
            x //map g, will loop through each value in the array and store it in x
          ) => (
            <>
            <h2>{x}</h2>
          <h3>{addToCount()}</h3>
          </>
          )))
        }
        <h1>Discussions</h1>
      </div>
      <div class="searchbar" id="searchbar">
        <label>Search...</label>
        <input type="text" placeholder="Search"></input>
        <button id="search" class="search">
          Search
        </button>
      </div>
      <div>
        <table id="mainline" class="mainline line">
          <tr>
            <th>Title</th>
            <th>Creator</th>
            <th>Book</th>
            <th>Genre</th>
          </tr>
        </table>
        <table id="secondaryline" class="secondaryline">
          <td>
            {elements.map((value, index) => {
              return <tr key={index}>{elements[0]}</tr>;
            })}
          </td>
          <td>
            {elements.map((value, index) => {
              return <tr key={index}>{elements[1]}</tr>;
            })}
          </td>
          <td>
            {elements.map((value, index) => {
              return <tr key={index}>{elements[2]}</tr>;
            })}
          </td>
          <td>
            {elements.map((value, index) => {
              return <tr key={index}>{elements[3]}</tr>;
            })}
          </td>
        </table>
      </div>
    </body>
  );
}

{
  /*
        <form className="discussionsform" >
        <table>
            <thead>

            <tr>
                <th>Title</th>
                <th>Creator</th>
                <th>Book</th>
                <th>Genre</th>
            </tr>
            </thead>
            <tbody>
                {}
            <tr>
                <td>Title</td>
                <td>Creator</td>
                <td>Book</td>
                <td>Genre</td>
            </tr>
            </tbody>
        </table>
        </form>
    */
}
