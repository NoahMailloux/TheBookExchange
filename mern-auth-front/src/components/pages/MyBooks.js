import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import LoggedInHeader from '../layout/LoggedInHeader';
import "./myBooks.css";
import Popup from 'reactjs-popup';



export default function MyBooks() {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const register = () => history.push("/register")
    const numbers = [1,2,3,4,5,6];
    const items = []
    for (const number of numbers) {
        items.push(
            <>
            <td>
                {<div className="myBook1"></div>}
                <Popup trigger={<button  className="bookDetailsBtn">Details</button>} position="right center">
                    <div>Popup content here !!</div> 
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
            <div className="myBooksFloatLeft">
                <table>{items}</table>
            </div>
            <div className="myBooksclear">
                <table>here</table>
            </div>

        </div>
    );

}
