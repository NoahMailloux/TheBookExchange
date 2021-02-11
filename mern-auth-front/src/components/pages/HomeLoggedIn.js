import React, {useEffect, useContext}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import LoggedInH from "../layout/LoggedInHeader";
import "../layout/Dashboard.css";


export default function HomeLoggedInH() {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    /*useEffect(() => {
        if(userData.user) console.log("logged in")
        if(!userData.user) console.log("Not logged in")
    }); */

    return(
    <div className="page-loggedin">
        <LoggedInH/>
        <div className="page-contents">

        </div>
    </div>
    );

}
