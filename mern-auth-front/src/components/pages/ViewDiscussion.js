import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import "./ViewDiscussion.css";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";

export default function Discussions() {
  const [discussions, setDiscussions] = useState({});
  const [books, setbooks] = useState({});

  const userData = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.userData.token) {
      console.log(userData.userData.token);
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
  /*
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
  }*/
  if (!userData) return null;

  return (
    <>
    <LoggedInHeader />
      <div className="parentdiv">
        <h1 id="mainline" className="mainline">
          Discussion Title
        </h1>
        <div className="comments">
        <div className="initialComment">
          <label >first comment div</label>
          <br></br>
          <label >first comment div</label>
        </div>

        
        <div className="generalComments">
          <label >General comment div</label>
          <br></br>
          <label >General comment div</label>
        </div>
        </div>
        <div className="postcomment">
        <label id="message" className="message">
          Your message
        </label>
        <br></br>
        <textarea
          name="comment"
          className="comment"
          id="comment"
          rows="6"
          cols="50"
          required="required"
        ></textarea>
        <br></br>
        <a className="post" href="/viewdiscussion">
          Post Comment
        </a>
        </div>
        <div className="thumbnail">
        <img
          width="335"
          height="500"
          src="/TheBookExchange/mern-auth-front/src/images/91AVsmqBaML.jpg"
          className="thumbnail"
          id="thumbnail"
        ></img>
        </div>
      </div>
    </>
  );
}
