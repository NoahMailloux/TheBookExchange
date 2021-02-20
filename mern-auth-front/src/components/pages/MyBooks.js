import React, {useEffect, useContext}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import LoggedInHeader from '../layout/LoggedInHeader';
import "./myBooks.css";



export default function MyBooks() {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const register = () => history.push("/register")
    const numbers = ['one', 'two', 'three', 'four'];
    const items = []
    for(const number of numbers){
        items.push(
            
            <>{<div className="myBook1"></div>}
            {<button onClick={register} className="bookDetailsBtn">Details</button>}</>
        
        )
    }
 //   function detailsOnClick() {
  //      popup.alert({
  //          content: 'Hello!'
  //      });
   // }
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
    return(
        <div>
        <LoggedInHeader />
        <h1>My Books</h1>
        {items}

        
        <table >
        <tr>
        <td>

        </td>
        </tr>
      

        </table>
    
        </div>
    );

}
