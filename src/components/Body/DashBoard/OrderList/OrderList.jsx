import React from 'react';
import './OrderList.css';

const OrderList = ({order,handleOrderPending}) => {

    return (
        <tr>
            <td>{order?.customerName}</td>
            <td>{order?.bookingEmail}</td>
            <td>{order?.serviceName}</td>
            <td>{order?.payWith}</td>
            {order?.status === 'Pending...' ? <td onClick={()=>handleOrderPending(order?._id,order?.status)} className='red'>{order?.status}</td>
            :<td className='green'>{order?.status}</td>
            }
        </tr>
    );
};

export default OrderList;