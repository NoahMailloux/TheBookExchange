import React, {useEffect, useContext}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import "./Discussions.css";
import LoggedInHeader from '../layout/LoggedInHeader';

export default function Discussions() {
    const {userData} = useContext(UserContext);
    const history = useHistory();
    const register = () => history.push("/register")


    return(
    <div>
        <LoggedInHeader />
        <h1>Discussions</h1>
    </div>
    );

}
