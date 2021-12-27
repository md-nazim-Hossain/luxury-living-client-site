import React,{useState, useEffect} from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import OrderList from '../OrderList/OrderList';

const OrderLists = () => {
    const [orderLists,setOrderLists] = useState([]);
    const{isLoading} = useAuth();

    useEffect(() =>{
        fetch(`https://floating-cliffs-41974.herokuapp.com/orderList`)
        .then(res => res.json())
        .then(data => setOrderLists(data))
    },[setOrderLists]);

    const handleOrderPending = (id) =>{

        fetch(`https://floating-cliffs-41974.herokuapp.com/orderList/${id}`,{
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
                )
            }
            
        }).catch(er =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...,An Error Occured, Please Try Again !',
                text: er.message,
            });
        })
    };



    if(isLoading){
        return <Spinner animation="border" className="m-5 p-5"/>
    };
    
    if(!orderLists.length){
        return <div className='d-flex justify-content-center align-items-center'>
            <h1>Items Not Found</h1>
        </div>
    }

    return (
        <Container className='py-3'>
            {orderLists.length && <div style={{backgroundColor:"white",borderRadius:"15px"}} className='p-3'>
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
                        orderLists.map(order => <OrderList
                        key={order._id}
                        order={order}
                        handleOrderPending={handleOrderPending}
                        >

                        </OrderList>)
                    }
                    </tbody>
                </Table>
            </div>}
        </Container>
    );
};

export default OrderLists;