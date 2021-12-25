import React, {useEffect, useState} from 'react';
import {Container, Form, Row, Col, Button, Image} from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const BookingInfo = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();
    const [active,setActive] = useState(true);
    const [service,setService] = useState({});

    const {name,img,details,cost} = service;

    let initialBookingInfo = {serviceId:id,customerName:user.displayName, bookingEmail:user.email, email:user.email,phone:'',address:"",status:"Pending...",payment:false}
    const [bookingInfo,setBookingInfo] = useState(initialBookingInfo);

    useEffect(() =>{
        fetch(`http://localhost:5000/services/${id}`)
        .then(res => res.json())
        .then(data => setService(data))
      },[id]);

    const handleNavigate = () =>{
        navigate(`/`);
    };

    const handleChangeName = e =>{
        const newInfo = {...bookingInfo,name:e.target.vaule};
        setBookingInfo(newInfo);
    };

    const handleChangeEmail = e =>{
        const newInfo = {...bookingInfo,email:e.target.value};
        setBookingInfo(newInfo);
    };

    const handleBookingInfo = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newCustomerInfo = {...bookingInfo,serviceName:name,serviceImg:img,serviceDetails:details,serviceCost:cost}
        newCustomerInfo[field] = value;
        setBookingInfo(newCustomerInfo);
    }
    
    const handelSubmitBookingInfo = e =>{
        e.preventDefault();
 
        fetch('http://localhost:5000/orderList',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(bookingInfo)
        }).then(res => res.json())
        .then(data =>{
            if(data.insertedId){
                Swal.fire(
                    user.displayName+' Your Service Order Successfull',
                    'Thank You For Join Us!',
                    'success'
                )
            }
            e.target.reset();
            handleNavigate();

        }).catch(er =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...,An Error Occured, Please Try Again !',
                text: er.message,
            });
        })
    }

    return (
        <div className='text-start p-5 bg-light'>
            <Container>
                {active ? <h1 className='py-5 text-center'>Customer Shipping Information For Provide Service</h1>
                :<h1 className='py-5 text-center'>Booking Services Confirmation Form</h1>}
                <Form onSubmit={handelSubmitBookingInfo}>
                    {active ? <Row xs={1} md={2}>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Full Name
                                    <sup>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="shipping-icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </sup>
                                </Form.Label>
                                <Form.Control name="customerName" onChange={handleChangeName} onBlur={handleBookingInfo} value={bookingInfo.customerName} required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address
                                    <sup>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="shipping-icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </sup>
                                </Form.Label>
                                <Form.Control name="email" onChange={handleChangeEmail} onBlur={handleBookingInfo} type="email" value={bookingInfo.email} required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Service Id</Form.Label>
                                <Form.Control value={id} disabled/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control name="phone" onBlur={handleBookingInfo} placeholder="Cell Number"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Shipping address
                                    <sup>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="shipping-icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </sup>
                                </Form.Label>
                                <Form.Control name="address" onBlur={handleBookingInfo} placeholder="Enter Your Shipping Address" required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Country Name</Form.Label>
                                <Form.Control name="countryName" onBlur={handleBookingInfo} placeholder="Enter Your Country Name"/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>City
                                    <sup>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="shipping-icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </sup>
                                </Form.Label>
                                <Form.Control name="cityName" onBlur={handleBookingInfo} placeholder="Enter City Name" required/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Zipp Code
                                    <sup>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="shipping-icon" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </sup>
                                </Form.Label>
                                <Form.Control name="zipCode" onBlur={handleBookingInfo} placeholder="Enter Zipp Code" />
                            </Form.Group>
                        </Col>
                    </Row>
                    :
                    <Row xs={1} md={2}>
                        <Col>
                            <Image src={service?.img} className='img-fluid'/>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3 fs-6" controlId="formBasicEmail">
                                <Form.Label>Service Id</Form.Label>
                                <Form.Control value={id} disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3 fs-6" controlId="formBasicEmail">
                                <Form.Label>Customer Name</Form.Label>
                                <Form.Control value={bookingInfo?.customerName} disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3 fs-6" controlId="formBasicEmail">
                                <Form.Label>Customer Email</Form.Label>
                                <Form.Control value={bookingInfo?.email} disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3 fs-6" controlId="formBasicEmail">
                                <Form.Label>Customer Address</Form.Label>
                                <Form.Control value={bookingInfo?.address} disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3 fs-6" controlId="formBasicEmail">
                                <Form.Label>Customer CityName</Form.Label>
                                <Form.Control value={bookingInfo?.cityName} disabled/>
                            </Form.Group>
                        </Col>
                    </Row>}
                    {!active && <div className='text-end pt-3'><Button type='submit' variant="transparent" className='log-btn'>Book Now</Button></div>}
                </Form>
                <Row xs={1} sm={2} md={2}>
                    <Col>
                        <div className='text-start pt-3' onClick={() => setActive(true)}>
                            <Button variant="transparent" className='log-btn' {...active && {disabled:true}}>Prev</Button>
                        </div>
                    </Col>
                    <Col>
                        <div className='text-end pt-3' onClick={() => setActive(false)}>
                            <Button variant="transparent" className='log-btn' {...!active && {disabled:true}}>Next</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BookingInfo;