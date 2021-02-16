import React, {useEffect, useContext, useState, useCallback}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import "./CreateDiscussion.css"
import LoggedInHeader from '../layout/LoggedInHeader';
import axios from 'axios';

export default function CreateDiscussion() {

    
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

    return(
      
    <body>

    <LoggedInHeader />
    

<div class="container">
<form action="">
<label for="fname">First Name</label>
    <input type="text" id="title" name="title" placeholder="Title"></input>

    <label for="lname">Last Name</label>
    <input type="text" id="Book" name="Book" placeholder="Book"></input>

    <label for="lname">Last Name</label>
    <input type="text" id="Genre" name="Genre" placeholder="Genre"></input>
</form>
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
