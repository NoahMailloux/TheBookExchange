import React, {useEffect, useContext, useState, useCallback}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import "./Discussions.css";
import LoggedInHeader from '../layout/LoggedInHeader';
import axios from 'axios';

export default function Discussions() {

    
    const [discussions, setDiscussions] = useState([])
    const {userData} = useContext(UserContext);
    const history = useHistory();

    /*  DO NOT USE
    const authAxios = axios.create({
        baseURL: "http://localhost:5001/discussion/listdiscussions",
        headers: {
            Authorization: userData.token
        }
    })*/

/* TABLE GENERATOR TEST
    const tableGenerator = () => {
        return (
          <table>
            <tr>
            </tr>
          </table>
        );
      }
*/
    const fetchDiscussions = useCallback(async() => {
        
        try{

            const loaddiscussions = await axios.post("http://localhost:5001/discussion/listdiscussions", 
            {
                headers: {
                    "x-auth-token": userData.token,
                    "Content-Type": "text/json"
                }
            })
            this.state(loaddiscussions)
        }catch(err){
            console.log(err.message)
        }
    })


    /*
    useEffect(() =>  {

        async function getdiscussions(){
            

        const loaddiscussions = await axios.post("http://localhost:5001/discussion/listdiscussions", 
        {
            headers: {
                "x-auth-token": userData.token,
                "Content-Type": "text/json"
            }
        })
        setState(loaddiscussions)
        }

        getdiscussions()
        //console.log(loaddiscussions)
    }, [more])
    */
        //e.preventDefault();

        const elements = ['one', 'two', 'three', 'four'];
        const elements2 = ['5', '6', '7', '8'];
    return(
      <body id="bodycolor">
    <div>
    <LoggedInHeader />

    <h1>Discussions</h1>
    </div>
    <div class="searchbar" id="searchbar">
      <label>Search...</label>
      <input type="text" placeholder="Search"></input>
      <button id="search" class="search">Search</button>
    </div>
    <div>

    <table id="mainline" class="mainline line">
        <tr>
                <th>Title</th>
                <th>Creator</th>
                <th>Book</th>
                <th>Genre</th>
            </tr>
      </table>
      <table id="secondaryline" class="secondaryline">
    <td>
      {elements.map((value, index) => {
        return <tr key={index}>{elements[0]}</tr>
      })}
    </td>
    <td>
      {elements.map((value, index) => {
        return <tr key={index}>{elements[1]}</tr>
      })}
    </td>
    <td>
      {elements.map((value, index) => {
        return <tr key={index}>{elements[2]}</tr>
      })}
    </td>
    <td>
      {elements.map((value, index) => {
        return <tr key={index}>{elements[3]}</tr>
      })}
    </td>
    </table>

    </div>
    </body>
    );
}

    {/*
        <form className="discussionsform" >
        <table>
            <thead>

            <tr>
                <th>Title</th>
                <th>Creator</th>
                <th>Book</th>
                <th>Genre</th>
            </tr>
            </thead>
            <tbody>
                {}
            <tr>
                <td>Title</td>
                <td>Creator</td>
                <td>Book</td>
                <td>Genre</td>
            </tr>
            </tbody>
        </table>
        </form>
    */}
