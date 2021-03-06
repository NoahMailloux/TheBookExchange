import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import HomeLoggedIn from "./components/pages/HomeLoggedIn";
import Discussions from "./components/pages/Discussions";
import creatediscussion from "./components/pages/CreateDiscussion";
import createcomment from "./components/pages/CreateComment";
import viewdiscussion from "./components/pages/ViewDiscussion";
import settings from "./components/pages/Settings";
import Genres from "./components/pages/Genres";
import MyBooks from "./components/pages/MyBooks";
import Overview from "./components/pages/Overview";
import EditAddress from "./components/pages/EditAddress";
import EditPaypal from "./components/pages/EditPaypal";
import EditProfile from "./components/pages/EditProfile";
import bookofthemonth from "./components/pages/BookOfTheMonth";
import "./style.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function App() {
  const stripePromise = loadStripe(
    "pk_test_51IV2RTDvCxMcNVdKNdQj0gyjSA45HGOKIBXW2Hq4kDr1WE4EoT4XDa8gst82XlzsBi1ioepzH1omtPO3XmNa1LVK00sn31eh1M"
  );

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkedLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:5001/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:5001/users/", {
          headers: { "x-auth-token": token },
        });

        setUserData({
          token,
          user: userRes.data,
        });
      }
    };
    checkedLoggedIn();
  }, []);

  return (
    <>
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <UserContext.Provider value={{ userData, setUserData }}>
            <div className="page-container">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/homeloggedin" component={HomeLoggedIn} />
                <Route path="/discussions" component={Discussions} />
                <Route path="/creatediscussion" component={creatediscussion} />
                <Route path="/genres" component={Genres} />
                <Route path="/myBooks" component={MyBooks} />
                <Route path="/createcomment" component={createcomment} />
                <Route path="/viewdiscussion" component={viewdiscussion} />
                <Route path="/settings" component={settings} />
                <Route path="/overview" component={Overview} />
                <Route path="/editAddress" component={EditAddress} />
                <Route path="/editPaypal" component={EditPaypal} />
                <Route path="/editProfile" component={EditProfile} />
                <Route path="/bookofthemonth" component={bookofthemonth} />
              </Switch>
            </div>
          </UserContext.Provider>
        </BrowserRouter>
      </Elements>
    </>
  );
}
