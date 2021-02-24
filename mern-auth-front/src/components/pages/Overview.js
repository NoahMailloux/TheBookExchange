import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import LoggedInHeader from '../layout/LoggedInHeader';
import PageBottom from "../layout/Footer";
import Popup from 'reactjs-popup';
import Axios from "axios";



export default function Overview() {
  const [bookNames, setBookNames] = useState({}); //use state to setBookNames and store books outside of useEffect
  const [bookAuthors, setAuthors] = useState({}); //#1
  const [bookRatings, setRatings] = useState({}); const [bookPrices, setPrices] = useState({}); const [bookGenres, setGenres] = useState({}); 
  const userData = useContext(UserContext);
  const history = useHistory();
  const imgUrl = "../../images/ExampleBook1.png";
  const divStyle = {
    backgroundImage: 'url(' + imgUrl + ')',
  };
  
    useEffect(() => {//when component renders run this
        if (userData.userData.token) {
          //console.log(userData.userData.token);
          Axios.get("http://localhost:5001/books/getAllBooks", {//this is an axios get requires route and headers, Axios post require route, null, headers in that order
            headers: {
              "x-auth-token": userData.userData.token,
              "Content-Type": "text/json",
            },
          }).then((data) => {//after something is returned, store in data
            let bookNamesArray = [];//blank array
            let bookAuthorsArray = [];//#2
            let bookRatingsArray = []; let bookPricesArray = []; let bookGenresArray = [];
            let parsedData = JSON.parse(data.data);//this will convert the data back into an object since axios returns only a string
            console.log(parsedData);
            for (const index in parsedData) {//for each index in the array of objects
              bookNamesArray.push(parsedData[index].name);//access data in parsed data via the index
              bookAuthorsArray.push(parsedData[index].author);//#3
              bookRatingsArray.push(parsedData[index].rating);bookPricesArray.push(parsedData[index].price);bookGenresArray.push(parsedData[index].genreID);
              //console.log(bookNamesArray)
            }
            //console.log(JSON.stringify(bookNamesArray));
            console.log(JSON.stringify(bookAuthorsArray));
            setBookNames(bookNamesArray);//use state to set books
            setAuthors(bookAuthorsArray);//#4
            setRatings(bookRatingsArray);setPrices(bookPricesArray);setGenres(bookGenresArray);
          });
        }
      }, [userData]);//everytime userData changes rerender
    
      if (!userData) return null;//if there is no user data, render null aka a blank page
    
      let bN = [];//empty array because we can only access data via an array with JSX
      let A = [];//#5
      let R = [];let P = [];let G = [];
      if (bookNames.length > 0) {//if there are bookNames..
        bN = Object.values(bookNames);//take all the book name values and store into array b
        A = Object.values(bookAuthors);//#6
        R = Object.values(bookRatings);P = Object.values(bookPrices);G = Object.values(bookGenres);
      }

    const numbers = [];//blank array
    for(var i=0;i<bookNames.length;i++){numbers.push(i);}//add numbers to array

    const items = [] //blank array to hold items to push
    i=-1;
    for (const number of numbers) { //loop for number of numbers
      i++;
        items.push(
            <>
            <td>
              
                {<div id="bookImg" className="myBook1"></div>/*style={divStyle} */}
                <Popup trigger={<button  className="bookDetailsBtn">Details</button>} position="right center">
                    <div className="popupContainer">
                    <button className="popupClose">[X]</button>
                        <div className="popupInnerContainer">_________________</div>
                        <div className="popupInnerContainer">{bN[i]/*grab name of first book*/}</div>
                        <div className="popupInnerContainer">____________</div>
                        <div className="popupInnerContainer">Genre:{G[i]/*#7*/}</div>
                        <div className="popupInnerContainer">Author: {A[i]/*#7*/}</div>
                        <div className="popupInnerContainer">Rating: {R[i]/*#7*/}/5</div>
                        <div className="popupInnerContainer">Price: $ {P[i]/*#7*/}.00</div>
                     </div> 
                </Popup>
            </td>

            </>

        )
    }


  
    return (
        <div>
            <LoggedInHeader />
            <h1>Overview</h1>
            <div className="myBooksOutterContainer">
            <div className="myBooksInnerContainer">
                  <table>{items}</table>
              </div>
            </div>
            <PageBottom/>
        </div>
    );

}
