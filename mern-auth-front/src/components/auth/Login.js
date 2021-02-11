import React, {useState, useContext} from 'react';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(); 

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password};
            const loginRes = await Axios.post(
                "http://localhost:5001/users/login",
                loginUser
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        }catch(err){
            err.response.data.msg && setError(err.response.data.msg);
        }
    };

    return (
        <div className="page2">
            <div classname="loginPageContainer">
                {error && (
                <ErrorNotice message={error} clearError={() => setError(undefined)} /> 
                )}
                <div className="loginContainer">
                    <h2 className="loginT">Sign In</h2>
                    <h4 className="loginP">Lorem ipsum dolor 
                    sit amet, consectetur adipiscing elit. 
                    In nec nibh vitae...</h4>
                    <form className="form2" onSubmit={submit}>
                        <input 
                        placeholder="Email"
                        id="login-email" 
                        type ="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                        placeholder="Password"
                        id="login-password" 
                        type ="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <input type ="submit" value="Log in"/>
                    </form>
                    <h4><a href="https://pointerpointer.com/">Forgot your password?</a></h4>
                </div>
                
            </div>
        </div>
        /*<div className="page">
            <h2>Log in</h2>
            {error && (
            <ErrorNotice message={error} clearError={() => setError(undefined)} /> 
            )}
            <form className="form" onSubmit={submit}>
                <label htmlFor="login-email">Email</label>
                <input 
                id="login-email" 
                type ="email" 
                onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="login-password">Password</label>
                <input 
                id="login-password" 
                type ="password"
                onChange={(e) => setPassword(e.target.value)}
                />
                <input type ="submit" value="Log in"/>
            </form>
        </div>*/ /* Original login*/
    );      
   
}
