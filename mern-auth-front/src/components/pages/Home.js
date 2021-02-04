import React, {useEffect, useContext}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Home() {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if(!userData.user) history.push("/login")
    });

    return(
    <div className="page">
        <div className="homeTop">
            <p>Sign Up To Share Books With Other Readers</p>
            <p>&</p>
            <p>Read New Books For $25 A Month</p>
            </div>
        <div className="homeTop">
        <p>About The Book Exchange Project</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
         pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
         culpa qui officia deserunt mollit anim id est laborum</p>
        </div>
        
        <div></div>
    </div>
    );

}
