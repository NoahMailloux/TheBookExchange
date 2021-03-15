import {CardElement} from '@stripe/react-stripe-js'
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import{Elements, useElements, useStripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        'color': '#32325d',
        'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
        'fontSmoothing': 'antialiased',
        'fontSize': '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

export default function CardInput() {
    return (
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      );
}