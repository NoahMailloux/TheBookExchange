import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import "./CreateDiscussion.css";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function CreateDiscussion() {
  const [error, setError] = useState();

  const [title, setTitle] = useState();
  const [book, setBook] = useState();
  const [genre, setGenre] = useState();
  const [comment, setComment] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();



  //submit form test
  const submit = async (e) => {
    e.preventDefault();
    const email=""
    const password = ""
    //MISSING CREATOR
    const newDiscussion = {title, book, genre, comment}
    await Axios.post("http://localhost:5001/discussion/creatediscussion",
    newDiscussion
    );
    const loginRes = await Axios.post("http://localhost:5001/users/login", {
    email,
    password,
    })
    setUserData({
      token: loginRes.data.token,
      user: loginRes.data.user,
    })
    localStorage.setItem("auth-token", loginRes.data.token)
    history.push("/TheBookExchange/mern-auth-front/src/components/pages/Discussions.css")
  };

  return (
    <>
      <LoggedInHeader />

      <div className="container">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <h1>Create Discussion</h1>
        <form className="form1" onSubmit={submit}>
          <h3 id="title">Title</h3>
          <input
            id="title"
            id="create-title"
            className="inputs"
            type="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <h3 id="book">Book</h3>
          <input
            id="Book"
            name="create-Book"
            className="inputs"
            type="Book"
            placeholder="Book"
            onChange={(e) => setBook(e.target.value)}
          ></input>

          <h3 id="genre">Genre</h3>
          <input
            id="Genre"
            name="Genre"
            id="create-Genre"
            type="Genre"
            className="inputs"
            placeholder="Genre"
            onChange={(e) => setGenre(e.target.value)}
          ></input>

          <h3 id="lname">Comment</h3>
          <br></br>
          <textarea
            id="Comment"
            name="Comment"
            className="inputs"
            placeholder="Insert Comment"
            onChange={(e) => setComment(e.target.value)}
            rows="6"
            cols="50"
          ></textarea>
          <br></br>
          <input type ="submit" value="Create"/>
        </form>
      </div>
    </>
  );
}
