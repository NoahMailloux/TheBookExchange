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
  //const [discussions, setDiscussions] = useState([])
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {}, [userData]);

  if (!userData) return null;

  //submit form test
  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: title,
        book: book,
        genre: genre,
        comment: comment,
        creator: userData.userData.id,
      };
      const header = {
        headers: {
          "x-auth-token": userData.userData.token,
          "Content-Type": "text/json",
        },
      };
      console.log(userData.user);
      //const newDiscussion = { title, book, genre, comment, creator };
      const createDiscussRes = await Axios.post(
        "http://localhost:5001/discussion/creatediscussion",
        data,
        header
      );
      console.log(createDiscussRes);
      /*
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });*/
      //localStorage.setItem("auth-token", loginRes.data.token);
      //history.push("/");
    } catch (err) {
      //err.response.data.msg && setError(err.response.data.msg);
      console.log(JSON.stringify(err.response));
    }
  };

  return (
    <>
      <LoggedInHeader />

      <div className="container">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <h1>Create Discussion</h1>
        <form onSubmit={submit}>
          <h3 id="fname">Title</h3>
          <input
            id="title"
            name="title"
            className="inputs"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          <h3 id="lname">Book</h3>
          <input
            id="Book"
            name="Book"
            className="inputs"
            placeholder="Book"
            onChange={(e) => setBook(e.target.value)}
          ></input>

          <h3 id="lname">Genre</h3>
          <input
            id="Genre"
            name="Genre"
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
          <button id="create" className="sub" name="create">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
