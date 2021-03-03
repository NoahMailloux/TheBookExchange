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
         // console.log(data)
          //console.log(data.data.bookIDsArray);

          let bookNamesArray = [];//blank array
          let bookAuthorsArray = [];//#2
          let bookRatingsArray = []; let bookPricesArray = []; let bookGenresArray = []; let bookImgsArray = [];

          data.data.bookIDsArray.forEach(element => {
            bookNamesArray.push(element[0].name);//access data in parsed data via the index
            bookAuthorsArray.push(element[0].author);//#3
            bookRatingsArray.push(element[0].rating); bookPricesArray.push(element[0].price);
            bookGenresArray.push(element[0].genreID); bookImgsArray.push(element[0].bookUrl);
           // console.log(element[0])
          });
          setBookNames(bookNamesArray);//use state to set books
          setAuthors(bookAuthorsArray);//#4
          setRatings(bookRatingsArray); setPrices(bookPricesArray); setGenres(bookGenresArray); setImgs(bookImgsArray);
        });
      }
    }, [userData]);//everytime userData changes rerender
  
    if (!userData) return null;//if there is no user data, render null aka a blank page

    let bN = [];//empty array because we can only access data via an array with JSX
    let A = [];//#5
    let R = []; let P = []; let G = []; let img = [];
    if (bookNames.length > 0) {//if there are bookNames..
      bN = Object.values(bookNames);//take all the book name values and store into array b
      A = Object.values(bookAuthors);//#6
      R = Object.values(bookRatings); P = Object.values(bookPrices); G = Object.values(bookGenres); img = Object.values(bookImgs);
    }

    const numbers = [];//blank array
    for (var i = 0; i < bookNames.length; i++) { numbers.push(i); }//add numbers to array
  
  
  
  
    const items = [] //blank array to hold items to push
    i = -1; let x = numbers.length;
  
    for (const number of numbers) { //loop for number of numbers
  
      //i++;
  
      if (x >= 4) {
        items.push(
          <>
          {console.log("creating 4 cells")}
            <tr>
              <td>
                {<img className="myBook" src={img[i]} />}
                <Popup trigger={<button className="bookDetailsBtn">Details</button>} position="right center">
                  <div className="popupContainer">
                    <div className="popupInnerContainer">_________________</div>
                    <div className="popupInnerContainer">{bN[i]/*grab name of first book*/}</div>
                    <div className="popupInnerContainer">____________</div>
                    <div className="popupInnerContainer">Genre:{G[i]/*#7*/}</div>
                    <div className="popupInnerContainer">Author: {A[i]}</div>
                    <div className="popupInnerContainer">Rating: {R[i]}/5</div>
                    <div className="popupInnerContainer">Price: $ {P[i]}.00</div>
                  </div>
                </Popup>
              </td>
              <td>
                {<img className="myBook" src={img[i + 1]} />}
                <Popup trigger={<button className="bookDetailsBtn">Details</button>} position="right center">
                  <div className="popupContainer">
                    <div className="popupInnerContainer">_________________</div>
                    <div className="popupInnerContainer">{bN[i + 1]/*grab name of first book*/}</div>
                    <div className="popupInnerContainer">____________</div>
                    <div className="popupInnerContainer">Genre:{G[i + 1]/*#7*/}</div>
                    <div className="popupInnerContainer">Author: {A[i + 1]}</div>
                    <div className="popupInnerContainer">Rating: {R[i + 1]}/5</div>
                    <div className="popupInnerContainer">Price: $ {P[i + 1]}.00</div>
                  </div>
                </Popup>
              </td>
              <td>
                {<img className="myBook" src={img[i + 2]} />}
                <Popup trigger={<button className="bookDetailsBtn">Details</button>} position="right center">
                  <div className="popupContainer">
                    <div className="popupInnerContainer">_________________</div>
                    <div className="popupInnerContainer">{bN[i + 2]/*grab name of first book*/}</div>
                    <div className="popupInnerContainer">____________</div>
                    <div className="popupInnerContainer">Genre:{G[i + 2]/*#7*/}</div>
                    <div className="popupInnerContainer">Author: {A[i + 2]}</div>
                    <div className="popupInnerContainer">Rating: {R[i + 2]}/5</div>
                    <div className="popupInnerContainer">Price: $ {P[i + 2]}.00</div>
                  </div>
                </Popup>
              </td>
              <td>
                {<img className="myBook" src={img[i + 3]} />}
                <Popup trigger={<button className="bookDetailsBtn">Details</button>} position="right center">
                  <div className="popupContainer">
                    <div className="popupInnerContainer">_________________</div>
                    <div className="popupInnerContainer">{bN[i + 3]/*grab name of first book*/}</div>
                    <div className="popupInnerContainer">____________</div>
                    <div className="popupInnerContainer">Genre:{G[i + 3]/*#7*/}</div>
                    <div className="popupInnerContainer">Author: {A[i + 3]}</div>
                    <div className="popupInnerContainer">Rating: {R[i + 3]}/5</div>
                    <div className="popupInnerContainer">Price: $ {P[i + 3]}.00</div>
                  </div>
                </Popup>
              </td>
            </tr>
          </>
        )
        x = x - 4;
        console.log("x is " + x)
        i = i + 3;
        
      }else if(x != 0){
        i++;
          items.push(<td>
            {<img className="myBook" src={img[i]} />}
            <Popup trigger={<button className="bookDetailsBtn">Details</button>} position="right center">
              <div className="popupContainer">
                <div className="popupInnerContainer">_________________</div>
                <div className="popupInnerContainer">{bN[i]/*grab name of first book*/}</div>
                <div className="popupInnerContainer">____________</div>
                <div className="popupInnerContainer">Genre:{G[i]/*#7*/}</div>
                <div className="popupInnerContainer">Author: {A[i]}</div>
                <div className="popupInnerContainer">Rating: {R[i]}/5</div>
                <div className="popupInnerContainer">Price: $ {P[i]}.00</div>
              </div>
            </Popup>
          </td>) 
          x=x-1; 
        }//end outter
  
  
    }
  
  
  
    return (
      <div>
        <LoggedInHeader />
          <div className="parentdiv">
          <h1>Books Shared With Me</h1>
              <table className="mainline line">{items}</table>  
          </div>
      </div>  
      
    );
  /* <PageBottom /> */
  }
  
  /*
      <div>
        {console.log(items)}
        <LoggedInHeader />
        <h1>Books Shared With Me</h1>
        <div className="myBooksOutterContainer">
          <div className="myBooksInnerContainer">
            <table>{items}</table>
           
          </div>  
        </div>  
      </div>
  */