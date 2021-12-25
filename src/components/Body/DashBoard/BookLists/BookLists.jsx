import React from 'react';
import {Container, Row} from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';
import BookList from '../BookList/BookList';

const BookLists = () => {
    const{orderList,setOrderList} = useAuth();

    const style={
        padding:"15px",
        textAlign:"start"
    };

    //remove order items
    const handleRemoveItem = id =>{
        fetch(`http://localhost:5000/orderList/${id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                Swal.fire(
                    'Your Service Order Successfully Deleted',
                    'Please Click The Button!',
                    'success'
                )
            };
            setOrderList(orderList.filter(order => order._id !== id));
        }).catch(e =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...,An Occured Error! Please Try Again',
                text: e.message,
            })
        })
    };

    if(!orderList.length){
        return <div className='d-flex justify-content-center align-items-center'>
            <h1>Items Not Found</h1>
        </div>
    };
    
    return (
        <div style={style}>
            <Container>
                <Row xs={1} md={2} className='g-4'>
                    {
                        orderList.map(order => <BookList key={order._id}
                            order={order}
                            handleRemoveItem={handleRemoveItem}
                        />)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default BookLists;