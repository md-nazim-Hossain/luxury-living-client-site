import React from 'react';
import {Col, Card, Image, Button, Badge} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const BookList = ({order,handleRemoveItem}) => {

    const rounded={
        borderRadius:"15px"
    };
    const {_id,serviceName,serviceImg,serviceDetails,status,payment,serviceCost} = order;

    return (
        <Col>
            <Card style={rounded}>
                <Card.Body>
                    <div className='d-flex justify-content-between align-items-center pb-4'>
                        <div>
                            <Image src={serviceImg} style={{width:'60px'}}/>
                        </div>
                        <div>
                            <Button variant={status==='Pending...' ? 'primary':'success'} style={{pointerEvents:"none"}}>{status}</Button>
                            <Button className='ms-2' variant='danger' disabled={status==='Done'&& true} onClick={()=>handleRemoveItem(order._id)}>Remove</Button>
                        </div>
                    </div>
                    <Card.Title className='fw-bold'>{serviceName}</Card.Title>
                    <Card.Text>
                        <p>{serviceDetails}</p>
                    </Card.Text>
                    {payment ?<Badge bg='success'>{payment && payment}</Badge>:
                    <NavLink to={`/payment/${_id}`}><Button variant='outline-secondary' className='border-0'>{`pay $${serviceCost}`}</Button></NavLink>}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default BookList;