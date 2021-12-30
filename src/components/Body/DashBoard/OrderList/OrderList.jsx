import React, {useState} from 'react';
import './OrderList.css';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

const OrderList = ({order}) => {
 
    const [selectedOptions, setSelectedOptions] = useState('');
    const classList = ((selectedOptions || order?.deliveryStatus) === "Not Delivered" && 'not-delivered') || ((selectedOptions || order?.deliveryStatus) === "Delivered" && 'delivered') || ((selectedOptions || order?.deliveryStatus) === "Processing" && 'processing');

    const {getOrderListById} = useAuth();

    const handleOrderPending = (id) =>{

        if(order?.payment){
            getOrderListById(id,'Done')
            .then(res => res.json())
            .then(data =>{
                if(data.modifiedCount){
                    Swal.fire(
                        'Order Approved By Admin Successfully',
                        'Thank You For Approved!',
                        'success'
                    )
                }
                
            }).catch(er =>{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...,An Error Occured, Please Try Again !',
                    text: er.message,
                });
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...,Don\'t work action !',
                text: "Customer didn't payment yet!",
            });
        }
    };

    // Handle Order Process
    const handleOrderProcess = (e) =>{
        setSelectedOptions(e.target.value);
            getOrderListById(order?._id,e.target.value)
            .then(res => res.json())
            .then(data =>{
                if(data.modifiedCount){
                    Swal.fire(
                        `${e.target.value} Service Order Updated`,
                        'Thank You For Approved!',
                        'success'
                    )
                }
                
            })
    };

    return (
        <tr>
            <td>{order?.customerName}</td>
            <td>{order?.bookingEmail}</td>
            <td>{order?.serviceName}</td>
            <td>{order?.payWith}</td>
            {order?.status === 'Pending...' ? <td onClick={()=>handleOrderPending(order?._id)} className='red'>
                {order?.status}
            </td>
            :<td className='green'>{order?.status}</td>
            }
            <td className='p-0'>
                <select onChange={(order?.deliveryStatus !== 'Delivered' && order?.status==='Done') && handleOrderProcess} className={classList ? classList : "not-delivered"}>
                    {(order?.deliveryStatus !== 'Delivered' && order?.status==='Done') && <option value="Delivered">Delivered</option>}
                    <option selected value={order?.deliveryStatus}>{order?.deliveryStatus}</option>
                    {(order?.deliveryStatus !== 'Delivered' && order?.status==='Done') &&<option value="Processing">Processing</option>}
                </select>
            </td>
        </tr>
    );
};

export default OrderList;