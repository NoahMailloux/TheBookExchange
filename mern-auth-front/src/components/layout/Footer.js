import React from 'react';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom";
import AuthOptions from '../auth/AuthOptions'
import "./Dashboard.css";

export default function Footer() {
    const history = useHistory();
    const mainScreen = () => history.push("/")

    return (
        
        <>
        <footer>

            <div className="footer">
                <div className="footerInner">
                <button className="tLinks" onClick={mainScreen}>The Book Exchange 2020</button>
                </div>
            </div>

        </footer>
        </>
    );
}
