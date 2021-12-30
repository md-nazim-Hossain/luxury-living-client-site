import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';

const CheckOut = ({order}) => {
    const {_id,serviceCost,customerName,bookingEmail} = order;
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [processing,setProcessing] = useState(false);
    const [success,setSuccess] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("https://floating-cliffs-41974.herokuapp.com/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({serviceCost}),
        })
          .then((res) => res.json())
          .then((data) =>setClientSecret(data.clientSecret));
      }, [serviceCost]);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          return;
        }

        const card = elements.getElement(CardElement);
    
        if (card == null) {
          return;
        }
        setProcessing(true);
        // Use your card Element with other Stripe.js APIs
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card,
        });
    
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...,An Error Occured, Please Try Again !',
            text: error.message,
        });
        } else {
          console.log('[PaymentMethod]', paymentMethod);

        };

        //Payment Intents
        const {paymentIntent, error:inetntError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: customerName,
                  email:bookingEmail
                },
              },
            },
          );
          if(inetntError){
            Swal.fire({
                icon: 'error',
                title: 'Oops...,An Error Occured, Please Try Again !',
                text: inetntError.message,
            });

          }else{
                setProcessing(false);
                // Save Database
                const payment={
                    payWith:paymentMethod.type,
                    payment:true,
                    transitionId:paymentIntent.client_secret.slice('_secret')[0],
                    last4:paymentMethod.card.last4
                };
                fetch(`https://floating-cliffs-41974.herokuapp.com/orderList/${_id}`,{
                    method:"PUT",
                    headers:{
                        "content-type":"application/json"
                    },
                    body:JSON.stringify(payment)
                }).then(res => res.json())
                .then(data =>{
                    if(data.modifiedCount){
                        Swal.fire(
                            customerName+' Your Service Payment Successfull',
                            'Please Press The Button',
                            'success'
                        ).then(data => {
                            if(data.isConfirmed){
                                window.location.reload();
                            }
                        })
                        setSuccess(true);
                    }
                })

          }
      };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className='p-2' style={{backgroundColor:"white"}}>
                    <CardElement
                        options={{
                        style: {
                            base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                            },
                            invalid: {
                            color: '#9e2146',
                            },
                        },
                        }}
                    />
                </div>
                <Row xs={1} md={2}>
                   <Col>
                      <p className='checkout-service-cost'><small>Your Service Charged Will be <b>${order?.serviceCost ? order?.serviceCost : "00"}</b></small></p>
                   </Col>
                    <Col>
                      <div className='payment-button'><Button type='submit' variant="transparent" className='log-btn' disabled={!stripe || processing || success}>Pay ${serviceCost}</Button></div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default CheckOut;