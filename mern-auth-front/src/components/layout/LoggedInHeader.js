import {React, useContext} from "react";
//import {Link} from "react-router-dom";
//import AuthOptions from '../auth/AuthOptions'
import {useHistory} from "react-router-dom"; //react hook
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
    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory(); //grabs history of url bar so we can change url
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        history.push("/")
    };

  return (
    <>
      <div className="logged-in-layout">
        <Navbar className="topnav" collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">The Book Exchange Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link onClick={logout}>Logout</Nav.Link>
              <Nav.Link eventKey={2} href="#memes">
                Settings
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="Menu">
          <button className="navbtn"> </button>
          <button className="navbtn"> </button>
          <button className="navbtn"> </button>
          <button className="navbtn"> </button>
          <button className="navbtn"> </button>
        </div>
    </div>
    </>
  );
}
