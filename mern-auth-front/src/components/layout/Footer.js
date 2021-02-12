import React from 'react';
import {Link} from "react-router-dom";
import AuthOptions from '../auth/AuthOptions'

export default function Footer() {
    return (
        <header id="footer">
        <div>
            <Link to ="/">
                <h1 className="footer">The Book Exchange 2020</h1>
            </Link> 
            <AuthOptions></AuthOptions>
        </div>
        </header>
    );
}
