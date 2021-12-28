import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckOut from './CheckOut';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

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