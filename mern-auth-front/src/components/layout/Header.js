import React from 'react';
import {Link} from "react-router-dom";
import AuthOptions from '../auth/AuthOptions'

export default function Header() {
    return (
        <header id="header">
        <div>
            <Link to ="/">
                <h1 className="title">The Book Exchange</h1>
            </Link> 
            <AuthOptions></AuthOptions>
        </div>
        </header>
    );
}
