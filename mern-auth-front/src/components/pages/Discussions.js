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
        let discussionID = [];
        for (const index in parsedData) {
          //this loops through every single index withing the array of objects
          titles.push(parsedData[index].title); //push the title for each index in the array, parsed data into titles array
          bookNames.push(parsedData[index].book);
          discussionID.push(parsedData[index]._id);
          console.log(JSON.stringify(parsedData[index]._id));
        }
        setbooks(bookNames);
        setDiscussions(titles);
      });
    }
  }, [userData]);
  let count = 0;
  let titleArray = []; //Since JSX doesnt allow objects we have to access discussions via an array
  let bookNamesArray = [];
  let discussionIDArray = [];
  if (discussions.length > 0) {
    titleArray = Object.values(discussions);
    bookNamesArray = Object.values(books);
    discussionIDArray = Object.values(discussions);
  }

  function addToCount() {
    count++;
    return bookNamesArray[count - 1];
  }

  if (!userData) return null;

  return (
    <>
      <LoggedInHeader />
      <div className="parentdiv">
        <h1>Discussions</h1>
        <div className="discussionbar">
          <table id="mainline" className="mainline">
            <tbody>
              <tr>
                <th>Title</th>
                <th>Book</th>
              </tr>
            </tbody>
          </table>
          <table id="secondaryline" className="secondaryline">
            <tbody>
              <tr>
                <td>
                  {titleArray.map((x) => (
                    <>
                      <a href="">
                        <h2>Title: {x}</h2>
                        <h3>Book Name: {addToCount()}</h3>
                      </a>
                    </>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <a id="link" className="createnew" href="/Creatediscussion">
            Create Discussion
          </a>
        </div>




        
        <div className="searchbar" id="searchbar">
          <label className="searchlbl">Search...</label>
          <br></br>
          <input placeholder="Discussion Search"></input>
          <br></br>
          <br></br>
          <a id="search" href="/Creatediscussion" className="search">
            Search
          </a>
        </div>
      </div>
    </>
  );
}
