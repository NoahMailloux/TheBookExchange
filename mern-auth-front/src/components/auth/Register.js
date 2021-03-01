import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";


export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [address, setAddress] = useState();
    const [postCode, setPostCode] = useState(); 
    const [state, setUSState] = useState(); 
    const [city, setCity] = useState(); 
    const [error, setError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {email, password, passwordCheck, displayName, address, postCode, state, city}; //updating, added  postCode, state, city
            await Axios.post(
                "http://localhost:5001/users/register",
                newUser
            );
            const loginRes = await Axios.post("http://localhost:5001/users/login",{
                email, 
                password,
             });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        }
        catch(err){
            err.response.data.msg && setError(err.response.data.msg);
        }

    };

    return(
        <div className="page2">
            <div classname="loginPageContainer">
                {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} /> 
                )}
                <div className="loginContainer">
                    <h2 className="loginT">Sign Up</h2>
                    <h4 className="loginP">Lorem ipsum dolor 
                    sit amet, consectetur adipiscing elit. 
                    In nec nibh vitae...</h4>
                    <form className="form2" onSubmit={submit}>
                        <input 
                        placeholder="Email"
                        id="register-email" 
                        type ="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                        placeholder="Password"
                        id="register-password" 
                        type ="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <input 
                        type="password" 
                        placeholder="Verify password"
                        onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                        <input 
                        placeholder="Display Name"
                        id="register-display-name" 
                        type ="text"
                        onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <input 
                        placeholder="Street"
                        id="register-address" 
                        type ="text"
                        onChange={(e) => setAddress(e.target.value)}
                        />
                        <input 
                        placeholder="Post Code"
                        id="register-postCode" 
                        type ="text"
                        onChange={(e) => setPostCode(e.target.value)} 
                        />
                        <input 
                        placeholder="State"
                        id="register-USState" 
                        type ="text"
                        onChange={(e) => setUSState(e.target.value)} 
                        />
                        <input 
                        placeholder="City"
                        id="register-city" 
                        type ="text"
                        onChange={(e) => setCity(e.target.value)} 
                        />

                        <input type ="submit" value="Register"/>
                        <p className="registerTermsP">By signing up you agree to our</p>
                        <p className="registerTermsP">Terms & Conditions</p>
                    </form>
                </div> 
            </div>
        </div>
    );

}
 
/*
        <div className="page">
            <h2>Register</h2>
            {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} /> 
            )}
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input 
                id="register-email" 
                type ="email" 
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="register-password">Password</label>
                <input 
                id="register-password" 
                type ="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <input 
                type="password" 
                placeholder="Verify password"
                onChange={(e) => setPasswordCheck(e.target.value)}
                />

                <label htmlFor="register-display-name">Display Name</label>
                <input 
                id="register-display-name" 
                type ="text"
                onChange={(e) => setDisplayName(e.target.value)}
                />

                <label htmlFor="register-address">Address</label>
                <input 
                id="register-address" 
                type ="text"
                onChange={(e) => setAddress(e.target.value)}
                />

                <input type ="submit" value="Register"/>
            </form>
        </div>
*/ /* Original Register*/