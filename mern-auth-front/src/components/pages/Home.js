import React, {useEffect, useContext}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";

export default function Home() {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const register = () => history.push("/register")

    useEffect(() => {
        if(userData.user) console.log("logged in")
        if(!userData.user) console.log("Not logged in")
    });

    return(
    <div className="page">
        <div className="homeTop">
            <div>      
                <h2 className="t1t">The Book Exchange Project</h2>
                <h4 className="tLinks"><a className="tLinks" href="http://localhost:3000/register">Register</a></h4>
                <h4 className="tLinks">|</h4>
                <h4 className="tLinks"><a className="tLinks" href="http://localhost:3000/login">Login</a></h4>
            </div>

            <p className="t1p">Sign-Up To Share Books<br></br>
            With Other Readers<br></br> & <br></br>Read New Books 
            For <br></br>$25 A Month</p>
            
            <button onClick={register} className="t1Btn">Sign Me Up</button>
        </div>
        <div>
            <h2 className="t2t"> About The Book Exchange Project</h2>
            <p className="t2p">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna ailqua.
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
