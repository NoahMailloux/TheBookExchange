import React, { useEffect, useContext, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import "./Discussions.css";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";
import ViewDiscussion from "./ViewDiscussion"


export default function Discussions() {
  const [discussions, setDiscussions] = useState();
  const [books, setbooks] = useState({});



  const userData = useContext(UserContext);
  const history = useHistory();
  const [discussionId, setDiscussionId] = useState();

  const submit = (did) => {
    console.log(did)
    setDiscussionId(did)
  }

  const reset = () => {
    setDiscussionId(null)
  }

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

        console.log(data.data)
        //console.log(JSON.stringify(parsedData));
        let titles = [];
        let bookNames = [];
        let discussionID = [];
       /* for (const index in parsedData) {
          //this loops through every single index withing the array of objects
          titles.push(parsedData[index].title); //push the title for each index in the array, parsed data into titles array
          bookNames.push(parsedData[index].book);
          discussionID.push(parsedData[index]._id);
          console.log(JSON.stringify(parsedData[index]._id));
        }
        setbooks(bookNames);
        setDiscussions(titles);*/

        setDiscussions(parsedData)

      });
    }
  }, [userData]);
  let count = 0;
  let titleArray = []; //Since JSX doesnt allow objects we have to access discussions via an array
  let bookNamesArray = [];
  let discussionIDArray = [];
  /*
  if (discussions.length > 0) {
    titleArray = Object.values(discussions);
    bookNamesArray = Object.values(books);
    discussionIDArray = Object.values(discussions);
  }
  */
  //console.log(discussionIDArray)

  function addToCount() {
    count++;
    return bookNamesArray[count - 1];
  }

  if (!userData || !discussions) return null;


  return (
    <>
      <LoggedInHeader />
      {
        !discussionId?(
          <div className="parentdiv">
        <h1>Discussions</h1>
        <h6>________________________________</h6>
        <div className="discussionbar">
          <table id="secondaryline" className="secondaryline">
            <tbody>
              <tr>
                <td>
                  {discussions.map((x) => (
                    <>
                      <form onSubmit={(e) => {e.preventDefault(); submit(x._id)}}>
                        <h2>Title: {x.title}</h2>
                        <h3>Book Name: {x.book}</h3>
                        <input type="submit" value="View Discussion" />
                      </form>
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
        {/*
        <div className="searchbar" id="searchbar">
          <label className="searchlbl">Search...</label>
          <br></br>
          <input placeholder="Discussion Search"></input>
          <br></br>
          <br></br>
          <a id="search" href="/Creatediscussion" className="search">
            Search
          </a>
        </div>*/}
      </div>
        ):(<ViewDiscussion d = {discussionId} r = {reset} />)      }
    </>
  );
}
