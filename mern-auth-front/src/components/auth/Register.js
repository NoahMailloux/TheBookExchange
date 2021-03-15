import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
// stripe
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import CardInput from "./CardInput";



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
  const [paid, setPaid] = useState();
  const [message, setMessage] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const stripePromise = loadStripe(
    "pk_test_51IV2RTDvCxMcNVdKNdQj0gyjSA45HGOKIBXW2Hq4kDr1WE4EoT4XDa8gst82XlzsBi1ioepzH1omtPO3XmNa1LVK00sn31eh1M"
  );
  const stripe = useStripe();
  const elements = useElements();

  const subscribe = async (e) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: email,
        },
      });
  
      if (result.error) {
        console.log(result.error.message);
      } else {
        const res = await Axios.post('http://localhost:5001/users/sub', {'payment_method': result.paymentMethod.id, 'email': email});
        // eslint-disable-next-line camelcase
        const {client_secret, status} = res.data;
  
        if (status === 'requires_action') {
          stripe.confirmCardPayment(client_secret).then(function(result) {
            if (result.error) {
              console.log('There was an issue!');
              setMessage("Payment failed");
              console.log(result.error);
              // Display error message in your UI.
              // The card was declined (i.e. insufficient funds, card has expired, etc)
            } else {
              console.log('You got the money!');
              setPaid("true")
              setMessage("Payment Success");
            }
          });
        } else {
          console.log('You got the money!');
          setMessage("Payment Success");
          setPaid(true)
          // No additional information was needed
          // Show a success message to your customer
        }
      }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        email,
        password,
        passwordCheck,
        displayName,
        address,
        postCode,
        state,
        city,
        paid
      }; //updating, added  postCode, state, city
      await Axios.post("http://localhost:5001/users/register", newUser);
      const loginRes = await Axios.post("http://localhost:5001/users/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page2">
      <script src="https://js.stripe.com/v3/"></script>
      <div classname="loginPageContainer">
        {error && (
          <ErrorNotice message={error} clearError={() => setError(undefined)} />
        )}
        <div className="loginContainer">
          <h2 className="loginT">Sign Up</h2>
          <h4 className="loginP">
            Please fill out all the information below. Paypal Email is optional
            but in order to send and recieve books, enter it and then click "Set
            Up Monthly Payment below.
          </h4>
          <form className="form2" onSubmit={submit}>
            <input
              placeholder="Email"
              id="register-email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              id="register-password"
              type="password"
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
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <input
              placeholder="Street"
              id="register-address"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              placeholder="Post Code"
              id="register-postCode"
              type="text"
              onChange={(e) => setPostCode(e.target.value)}
            />
            <input
              placeholder="State"
              id="register-USState"
              type="text"
              onChange={(e) => setUSState(e.target.value)}
            />
            <input
              placeholder="City"
              id="register-city"
              type="text"
              onChange={(e) => setCity(e.target.value)}
            />
            <h3>{message}</h3>
            <CardInput />
            <button onClick={(e) => {e.preventDefault(); subscribe()}} id="checkout" type="button">
              Subscribe
            </button>
            <input type="submit" value="Register" />
            <p className="registerTermsP">By signing up you agree to our</p>
            <p className="registerTermsP">Terms & Conditions</p>
          </form>
        </div>
      </div>
    </div>
  );
}
