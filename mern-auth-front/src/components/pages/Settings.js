import React, {useEffect, useContext}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import PageBottom from "../layout/Footer";
import LoggedInHeader from '../layout/LoggedInHeader';


export default function Settings() {
    const {userData} = useContext(UserContext);
    const history = useHistory();

    return(
        <>
    <div>
        <LoggedInHeader />
        <h1>Settings</h1>
        <div className="settingsContainer">
            <div className="settingsAddressContainer">
                    <h2 className="settingsH2">Address</h2>
                    <p className="settingsP">Street:</p>
                    <p className="settingsP">City:</p>
                    <p className="settingsP">State:</p>
                    <p className="settingsP">Zip Code:</p>
                    <button className="settingsBtn">Edit Address</button>
                </div>
                <div className="settingsPaymentContainer">
                    <h2 className="settingsH2">Payment</h2>
                    <p className="settingsP">PayPal ID:</p>
                    <button className="settingsBtn">Edit PayPalID</button>
                </div>
                <div className="settingsEditProfileContainer">
                    <h2 className="settingsH2">Edit Profile</h2>
                    <p className="settingsP">First Name:</p>
                    <p className="settingsP">Last Name:</p>
                    <p className="settingsP">Email:</p>
                    <p className="settingsP">Telephone:</p>
                    <button className="settingsBtn">Edit Profile</button>
                </div>
        </div>


    </div>

    <PageBottom/>
    </>
    
    );
    
}
