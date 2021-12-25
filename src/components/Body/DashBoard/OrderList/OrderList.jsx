import React,{useState, useEffect} from 'react';
import { Container, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './OrderList.css';

const OrderList = () => {
    const [orderList,setOrderList] = useState([]);

    useEffect(() =>{
        fetch(`http://localhost:5000/orderList`)
        .then(res => res.json())
        .then(data => setOrderList(data))
    },[]);

    const handleOrderPending = (id) =>{
        fetch(`http://localhost:5000/orderList/${id}`,{
            method:"PUT",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({status:"Done"})
        })
        .then(res => res.json())
        .then(data =>{
            if(data.modifiedCount){
                Swal.fire(
                    'Order Approved By Admin Successfully',
                    'Thank You For Approved!',
                    'success'
                ).then( result =>{
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                })
              
            }
            
        }).catch(er =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...,An Error Occured, Please Try Again !',
                text: er.message,
            });
        })
    };

    if(!orderList.length){
        return <div className='d-flex justify-content-center align-items-center'>
            <h1>Items Not Found</h1>
        </div>
    }

    return (
        <Container className='py-3'>
            {orderList.length && <div style={{backgroundColor:"white",borderRadius:"15px"}} className='p-3'>
                <Table responsive="sm" className='p-5' >
                    <thead>
                        <tr className='p-5 thead'>
                            <td>Name</td>
                            <td>Email Id</td>
                            <td>Service</td>
                            <td>Pay With</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orderList.map(order => <tr key={order._id}>
                            <td>{order.customerName}</td>
                            <td>{order.bookingEmail}</td>
                            <td>{order.serviceName}</td>
                            <td>Pay With</td>
                            {order?.status === 'Pending...' ? <td onClick={()=>handleOrderPending(order._id)} className='red'>{order?.status}</td>
                            :<td className='green'>{order?.status}</td>
                            }
                        </tr>)
                    }
                    </tbody>
                </Table>
            </div>}
        </Container>
    );
};

export default OrderList;