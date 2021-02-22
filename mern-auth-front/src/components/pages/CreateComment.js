import React, {useEffect, useContext, useState, useCallback}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import "./CreateComment.css"
import LoggedInHeader from '../layout/LoggedInHeader';
import axios from 'axios';

export default function CreateComment() {

    
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
      
    <body id="bodycolor">

    <LoggedInHeader />
    

<div class="container">
<form action="google.com">
<h3 for="fname">Title</h3>
    <label type="text" id="title" name="title" placeholder="Title">"booktitle"</label>

    <h3 for="lname">Book</h3>
    <label type="text" id="Book" name="Book" placeholder="Book">"Bookname"</label>

    <h3 for="lname">Genre</h3>
    <label type="text" id="Genre" name="Genre" placeholder="Genre">"Genre"</label>

    <h3 for="lname">Comment</h3>
    <br></br>
    <textarea id="Genre" name="Comment" placeholder="Insert Comment" rows="6" cols="50"></textarea>
        <br></br>
    <button id="create" class="sub" name="create">Create</button>
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
