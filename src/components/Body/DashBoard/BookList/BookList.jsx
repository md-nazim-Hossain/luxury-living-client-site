import React from 'react';
import {Col, Card, Image, Button, Badge} from 'react-bootstrap';

const BookList = ({order,handleRemoveItem}) => {

    const rounded={
        borderRadius:"15px"
    };
    const {serviceName,serviceImg,serviceDetails,status,payment} = order;

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
                            {!(status==='Done' || payment)&&<Button className='ms-2' variant='danger' onClick={()=>handleRemoveItem(order._id)}>Remove</Button>}
                        </div>
                    </div>
                    <Card.Title className='fw-bold'>{serviceName}</Card.Title>
                    <Card.Text>
                        <p>{serviceDetails}</p>
                    </Card.Text>
                    {payment ?<Badge bg='success'>Paid</Badge>:
                    <Badge bg='danger'>Not Paid</Badge>}
                </Card.Body>
            </Card>
        </Col>
    );
};

export default BookList;