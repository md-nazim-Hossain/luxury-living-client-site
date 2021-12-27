import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOut from './CheckOut';

const stripePromise = loadStripe('pk_test_51KBChbGo54pmGfjW9VWK5oAazfPyBu4WPenGa5FSOeO2bJ8DDcHiEoLn0tERrQWvgPpGtTMmKC98mDylnm7uFgGk00QYcUlUjY');
console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const Payment = ({order}) => {

    return (
        <div>
            <Elements stripe={stripePromise}>
                <CheckOut order={order}/>
            </Elements>
        </div>
    );
};

export default Payment;