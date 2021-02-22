import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import LoggedInHeader from '../layout/LoggedInHeader';
import PageBottom from "../layout/Footer";
import Popup from 'reactjs-popup';
import Axios from "axios";



export default function MyBooks() {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const register = () => history.push("/register")
    const [books, setBooks] = useState({});
  /* useEffect(() => {
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
            setBooks(data);
          });
        }
      }, [userData]); */

    const numbers = [];
    for(var i=0;i<6;i++){numbers.push(i);}

    const items = []
    for (const number of numbers) {
        items.push(
            <>
            <td>
                {<div className="myBook1"></div>}
                <Popup trigger={<button  className="bookDetailsBtn">Details</button>} position="right center">
                    <div className="popupContainer">
                    <button className="popupClose">[X]</button>
                        <div className="popupInnerContainer">_________________</div>
                        <div className="popupInnerContainer">Book Title</div>
                        <div className="popupInnerContainer">____________</div>
                        <div className="popupInnerContainer">Release Date:</div>
                        <div className="popupInnerContainer">Genre:</div>
                        <div className="popupInnerContainer">Author:</div>
                        <div className="popupInnerContainer">Buy Date:</div>
                      </div> 
                </Popup>
            </td>

            </>
        )
    }
    /*Adjust z index for popup */
    /*
        const elements = [{bookImg:"myBook1",bookDetails:"Details"},
            {bookImg:"myBook1",bookDetails:"Details2"}, 
            {bookImg:"myBook1",bookDetails:"Details3"},];
            {elements.map((value, index) => {
                var result = value.keys(obj).map((key) => [index(key), obj[key]]);
              })}
    
              //below table
            {elements.map((value, index) => {
            return <tr key={index}>{value}
            
            {JSON.stringify(value.bookImg)}
            {JSON.stringify(value.bookDetails)}
    
              })} below tr
    */
    return (
        <div>
            <LoggedInHeader />
            <h1>My Books</h1>
            <div className="myBooksOutterContainer">
              <div className="myBooksInnerContainer">
                  <table>{items}</table>
              </div>
              <div className="myBooksInnerContainer2">
              <table>{items}</table>
              </div>
            </div>
            <PageBottom/>
        </div>
    );

}
