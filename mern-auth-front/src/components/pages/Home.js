import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import PageBottom from "../layout/Footer";

export default function Home() {
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const register = () => history.push("/register")

    useEffect(() => {
        if (userData.user) history.push("/overview")
        if (!userData.user) console.log("Not logged in")
    });

    return (
        <>
            <div className="page">
                <div className="homeTop">
                    <div>
                        <h2 className="t1t">The Book Exchange Project</h2>
                        <AuthOptions />
                    </div>
                    <div className="openheader">
                        <p className="t1p">Sign-Up To Share Books<br></br>
                With Other Readers<br></br> & <br></br>Read New Books
                For <br></br>$25 A Month</p>
                        <button onClick={register} className="t1Btn">Sign Me Up</button>
                    </div>
                </div>
                <div className="aboutSection">
                    <h2 className="t2t">About The Book Exchange Project</h2>
                    <p className="t2p">With this project, readers throughout
                    the country can connect during this pandemic and be able
                    to discuss topics that they have read about to reinforce
                    and create learned knowledge. They will also be
                    interested in exploring their favorite genres to learn
                    about new and interesting authors, books, and
                  potentially, new genres.</p>
                    <p className="t2p2">Some Of Our Favorites!</p>
                    <div>
                        <div className="homeBook1"></div>
                        <div className="homeBook2"></div>
                        <div className="homeBook3"></div>
                        <div className="homeBook4"></div>
                    </div>
                </div>

            </div>

        </>

    );
    /* 
   <div className="homeLeftArrow"></div><div className="homeRightArrow"></div>
       <PageBottom/> 
   */
}
