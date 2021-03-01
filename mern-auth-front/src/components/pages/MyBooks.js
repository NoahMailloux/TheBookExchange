import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import LoggedInHeader from '../layout/LoggedInHeader';
import PageBottom from "../layout/Footer";
import Popup from 'reactjs-popup';
import Axios from "axios";



export default function MyBooks() {
    const history = useHistory();
    const register = () => history.push("/register")
    const [books, setBooks] = useState({});
    const [bookNames, setBookNames] = useState({}); //use state to setBookNames and store books outside of useEffect
    const [bookAuthors, setAuthors] = useState({}); //#1
    const [bookRatings, setRatings] = useState({}); const [bookPrices, setPrices] = useState({}); const [bookGenres, setGenres] = useState({}); const [bookImgs, setImgs] = useState({});
    const userData = useContext(UserContext);


    useEffect(() => {//when component renders run this
      if (userData.userData.token) {
        //console.log(userData.userData.token);
        Axios.get("http://localhost:5001/sharedBooks/mySharedBooks", {//this is an axios get requires route and headers, Axios post require route, null, headers in that order
          headers: {
            "x-auth-token": userData.userData.token,
            "Content-Type": "text/json",
          },
        }).then((data) => {//after something is returned, store in data
          console.log(data.data.bookIDsArray);
          data.data.bookIDsArray.forEach(element => {
            console.log(element[0])
          });
          let bookNamesArray = [];//blank array
          let bookAuthorsArray = [];//#2
          let bookRatingsArray = []; let bookPricesArray = []; let bookGenresArray = []; let bookImgsArray = [];
          let parsedData = JSON.parse(data);//this will convert the data back into an object since axios returns only a string
          console.log("got here");//JSON.stringify(parsedData)
         /* for (const index in parsedData) {//for each index in the array of objects
            bookNamesArray.push(parsedData[index].name);//access data in parsed data via the index
            bookAuthorsArray.push(parsedData[index].author);//#3
            bookRatingsArray.push(parsedData[index].rating); bookPricesArray.push(parsedData[index].price);
            bookGenresArray.push(parsedData[index].genreID); bookImgsArray.push(parsedData[index].bookUrl);
            //console.log(bookNamesArray) 
          }
          //console.log(JSON.stringify(bookNamesArray));
          console.log(JSON.stringify(bookAuthorsArray));
          setBookNames(bookNamesArray);//use state to set books
          setAuthors(bookAuthorsArray);//#4
          setRatings(bookRatingsArray); setPrices(bookPricesArray); setGenres(bookGenresArray); setImgs(bookImgsArray); */
        });
      }
    }, [userData]);//everytime userData changes rerender
  
    if (!userData) return null;//if there is no user data, render null aka a blank page

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
