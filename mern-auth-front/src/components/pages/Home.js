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
            <p className="t1p">Sign-Up To Share Books 
            With Other Readers & Read New Books 
            For $25 A Month</p>
            <button className="t1Btn">Sign Me Up</button>
        </div>
        <div>
            <h2 className="t2t"> About The Book Exchange Project</h2>
            <p className="t2p">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum</p>
            <p className="t2p2">Some Of Our Favorites!</p>
        </div>
        <div>
            <div className="homeLeftArrow"></div>
            <div className="homeBook1"></div>
            <div className="homeBook2"></div>
            <div className="homeBook3"></div>
            <div className="homeBook4"></div>
            <div className="homeRightArrow"></div>
        </div>
    </div>
    );

}
