import React, { useEffect, useContext, useState, createContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from "../auth/AuthOptions";
import LoggedInHeader from "../layout/LoggedInHeader";
import Axios from "axios";

export default function Genres() {
  const [discussions, setDiscussions] = useState({});
  const userData = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (userData.userData.token) {
      console.log(userData.userData.token);
      const headers = {
        headers: {
          "x-auth-token": userData.userData.token,
          "Content-Type": "text/json",
        },
      };
      Axios.post(
        "http://localhost:5001/discussion/listdiscussions", null,
        headers
      ).then((data) => {
        setDiscussions(data);
      });
    }
  }, [userData]);

  if (!userData) return null;

  return (
    <div>
      <LoggedInHeader />
      <h1>Genres{JSON.stringify(userData,userData) + JSON.stringify(discussions)}</h1>
    </div>
  );
}
