import React, {useEffect, useContext, useState}  from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthOptions from '../auth/AuthOptions';
import PageBottom from "../layout/Footer";
import LoggedInHeader from '../layout/LoggedInHeader';
import Axios from "axios";


export default function EditProfile() {
    const userData = useContext(UserContext);
    const [users, setUsers] = useState({});
    const history = useHistory();
    const editAddress = () => history.push("/editAddress")
    const editPaypal = () => history.push("/editPaypal")
    const editProfile = () => history.push("/editProfile")
    const settings = () => history.push("/settings")


    useEffect(() => {//when component renders run this
        if (userData.userData.token) {
          //console.log(userData.userData.token);
          Axios.get("http://localhost:5001/users/getuser", {//this is an axios get requires route and headers, Axios post require route, null, headers in that order
            headers: {
              "x-auth-token": userData.userData.token,
              "Content-Type": "text/json",
            },
          }).then((data) => {//after something is returned, store in data
            let userArray = [];//blank array
            let parsedData = JSON.parse(data.data);//this will convert the data back into an object since axios returns only a string
            console.log(parsedData);
            for (const index in parsedData) {//for each index in the array of objects
                userArray.push(parsedData[index].address);//access data in parsed data via the index
                userArray.push(parsedData[index].city);
                userArray.push(parsedData[index].state);
                userArray.push(parsedData[index].postCode);
                userArray.push(parsedData[index].paypalID);
                userArray.push(parsedData[index].fname);
                userArray.push(parsedData[index].lname);
                userArray.push(parsedData[index].email);
                userArray.push(parsedData[index].phone);
              //console.log(userArray)
            }
            console.log(JSON.stringify(userArray));
            setUsers(userArray);//use state to set books
          });
        }
      }, [userData]);//everytime userData changes rerender
    
      if (!userData) return null;//if there is no user data, render null aka a blank page

      let u = [];//empty array because we can only access data via an array with JSX
      if (users.length > 0) {//if there are users..
        u = Object.values(users);//take all the user values and store into array u
      }

    return(
        <>
    <div>
        <LoggedInHeader />
        <h1>Settings</h1>
        <div className="settingsContainer">
            <div className="settingsAddressContainer">
                    <h2 className="settingsH2">Address</h2>
                    <p className="settingsP">Street:{u[0]}</p>
                    <p className="settingsP">City:{u[1]}</p>
                    <p className="settingsP">State:{u[2]}</p>
                    <p className="settingsP">Zip Code:{u[3]}</p>
                    <button className="settingsBtn2" onClick={editAddress}>Edit Address</button>
                </div>
                <div className="settingsPaymentContainer">
                    <h2 className="settingsH2">Payment</h2>
                    <p className="settingsP">PayPal ID:{u[4]}</p>
                    <button className="settingsBtn" onClick={editPaypal}>Edit PayPalID</button>
                </div>
                <div className="settingsEditProfileContainer">
                    <h2 className="settingsH2">Edit Profile</h2>
                    <p className="settingsP">First Name:{u[5]}</p>
                    <p className="settingsP">Last Name:{u[6]}</p>
                    <p className="settingsP">Email:{u[7]}</p>
                    <p className="settingsP">Telephone:{u[8]}</p>
                    <button className="settingsBtn2" onClick={settings}>Done</button>
                    <button className="settingsBtn2" onClick={settings}>Cancel</button>
                </div>
        </div>


    </div>

    <PageBottom/>
    </>
    
    );
    
}
