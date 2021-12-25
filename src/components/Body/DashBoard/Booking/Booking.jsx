import React from 'react';
import { Col, Form, Image, Row, Button } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import creaditCard from '../../../../Image_Icon/Icon/creaditCard.png';
import paypal from '../../../../Image_Icon/Icon/image 17.png';

const Booking = () => {
    const {user} = useAuth();

    return (
        <div className='p-5 pb-2'>
            <Form>
                <Form.Control value={user.displayName} placeholder='Name' required className='mb-3 border-0'/>
                <Form.Control value={user.email} placeholder='Email' required className='mb-3 border-0'/>
                <Form.Control placeholder='Service Name' required className='mb-3 border-0'/>
                <p className='text-muted text-start my-1'>Pay With</p>
                <div className='d-flex'>
                    <p className='d-flex me-5'>
                        <Form.Check
                            type="radio"
                            label="Creadit Card"
                            name="formHorizontalRadios"
                            id="creaditCard"
                        />
                        <Image src={creaditCard} alt =""/>
                    </p>
                    <p className='d-flex'>
                        <Form.Check
                            type="radio"
                            label="PayPal"
                            name="formHorizontalRadios"
                            id="payPal"
                        />
                        <Image src={paypal} alt ="" name="formHorizontalRadios"/>
                    </p>
                </div>
                <Row>
                    <Col>
                        <Form.Control placeholder='Card Number' required className='mb-3 border-0'/>
                    </Col>
                </Row>
                <Row xs={1} md={2}>
                    <Col>
                        <Form.Control placeholder='Expired Date' required className='mb-3 border-0'/>
                    </Col>
                    <Col>
                        <Form.Control placeholder='CVN' required className='mb-3 border-0'/>
                    </Col>
                    <Col><small>Your Service Charged Will be <b>$1000</b></small></Col>
                    <Col>
                        <div className='text-end pb-5'><Button type='submit' variant="transparent" className='log-btn'>Pay</Button></div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default Booking;