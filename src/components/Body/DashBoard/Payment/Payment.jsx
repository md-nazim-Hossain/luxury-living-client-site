import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const{id} = useParams();
    const [order,setOrder] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:5000/orderList/${id}`)
        .then(res => res.json())
        .then(data => setOrder(data))
    },[id]);

    return (
        <div>
            <h1>Pay Please {order._id}</h1>
        </div>
    );
};

export default Payment;