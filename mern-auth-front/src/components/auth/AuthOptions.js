import React, {useContext} from 'react';
import {useHistory} from "react-router-dom"; //react hook
import UserContext from "../../context/UserContext";

export default function AuthOptions() {
    const {userData, setUserData} = useContext(UserContext);
    
    const history = useHistory(); //grabs history of url bar so we can change url

    const register = () => history.push("/register")//change url to register
    const login = () => history.push("/login")
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
    };

    return (
        <nav className="auth-options">
            {userData.user ? (
                <button className="tLinks" onClick={logout}>Log out</button>
            ) : (
             <>   
            <button className="tLinks" onClick={register}> | Register</button>
            <button className="tLinks" onClick={login}>Log in </button>
            </>
        )}
     </nav>
    );
}
