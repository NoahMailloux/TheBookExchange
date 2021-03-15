import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import "./ViewDiscussion.css";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";

export default function Discussions(props) {
  const [discussions, setDiscussions] = useState({});
  const [books, setbooks] = useState({});
  const [comment, setComment] = useState({})

  const userData = useContext(UserContext);
  const history = useHistory();


  useEffect(() => {
  let sendId = props.d
    if (userData.userData.token) {
      
      console.log(props.d)
     // console.log(userData.userData.token);
      Axios.get("http://localhost:5001/comments/listcomments", {
        headers: {
          "x-auth-token": userData.userData.token,
          "Content-Type": "text/json",
          sendId: sendId
        },
      }).then((data) => {
        let parsedData = JSON.parse(data.data);
        let comments = [];
        let userID = [];
        let discussionID = [];
        for (const index in parsedData) {
          //this loops through every single index withing the array of objects
          comments.push(parsedData[index].comment); //push the title for each index in the array, parsed data into titles array
          userID.push(parsedData[index].user_id);
          discussionID.push(parsedData[index].discussion_id);
          
        console.log(comments);
        }
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
        </div>
      </div>
    </>
  );
}
