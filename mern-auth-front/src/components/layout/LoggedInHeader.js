import { React, useContext } from "react";
//import {Link} from "react-router-dom";
//import AuthOptions from '../auth/AuthOptions'
import { useHistory } from "react-router-dom"; //react hook
import UserContext from "../../context/UserContext";

import {
  Navbar,
  NavDropdown,
  Button,
  Nav,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import "./Dashboard.css";
export default function LoggedInHeader() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory(); //grabs history of url bar so we can change url
  const discussions = () => history.push("/discussions");
  const genres = () => history.push("/Genres");
  const myBooks = () => history.push("/myBooks");
  const settings = () => history.push("/settings");
  const overview = () => history.push("/overview");
  const bookOfTheMonth = () => history.push("/bookofthemonth");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    history.push("/");
  };

  return (
    <>
      <div className="logged-in-layout">
        <Navbar
          className="topnav"
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <Navbar.Brand onClick={overview} href="#home">The Book Exchange Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
              <Nav.Link onClick={settings}>
                Settings
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="Menu">
        <button onClick={overview} className="navbtn">
            Overview
          </button>
          <button onClick={discussions} className="navbtn">
            Discussions
          </button>
          <button onClick={genres} className="navbtn">
            Genres
          </button>
          <button onClick={myBooks} className="navbtn">
            My Books
          </button><button onClick={bookOfTheMonth} className="navbtn">
            Book of the Month
          </button>
          <button className="navbtn"> </button>
          <button className="navbtn"> </button>
          <button className="navbtn"> </button>
        </div>
      </div>
    </>
  );
}
