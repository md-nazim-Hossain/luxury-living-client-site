import React,{useState, useEffect} from 'react';
import { Container, Button, Spinner, Table, } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import OrderList from '../OrderList/OrderList';

const OrderLists = () => {
    const [orderLists,setOrderLists] = useState([]);
    const [pageCount,setPageCount] = useState();
    const [page,setPage] = useState(0);
    const{isLoading} = useAuth();
    const size = 8;

    useEffect(() =>{
        fetch(`https://floating-cliffs-41974.herokuapp.com/orderList?page=${page}&&size=${size}`)
        .then(res => res.json())
        .then(data => {
            setOrderLists(data.orderList)
            const count = data.count;
            setPageCount(Math.ceil(count / size));
        })
    },[page]);


    if(isLoading){
        return <Spinner animation="border" className="m-5 p-5"/>
    };
    
    if(!orderLists.length){
        return <div className='d-flex justify-content-center align-items-center'>
            <h1>Items Not Found</h1>
        </div>
    };

    return (
        <Container className='orderListClass'>
            {orderLists.length && <div style={{backgroundColor:"white",borderRadius:"15px"}} className='p-3'>
                <Table responsive="sm" className='p-5' >
                    <thead>
                        <tr className='p-5 thead'>
                            <td>Name</td>
                            <td>Email Id</td>
                            <td>Service</td>
                            <td>Pay With</td>
                            <td>Status</td>
                            <td>Delivery Status</td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orderLists.map(order => <OrderList
                        key={order._id}
                        order={order}
                        >

                        </OrderList>)
                    }
                    </tbody>
                </Table>
            </div>}
            <div className='text-center'>
                <p>
                    {
                        [...Array(pageCount).keys()].map(num =><Button 
                            variant={num===page?'primary':'light'}
                            onClick={()=>setPage(num)}
                            disabled={num===page}
                            className='m-2'
                            >{num+1}</Button>)
                }
                </p>
            </div>
        </Container>
    );
};

export default OrderLists;