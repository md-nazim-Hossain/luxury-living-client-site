import React from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { Bounce } from 'react-reveal';
import { useState } from 'react';

const Contact = () => {
    const {REACT_APP_EMAIL_SERVICE_ID,REACT_APP_EMAIL_TEMPLATE_ID,REACT_APP_EMAIL_USER_ID} = process.env;
    const [data,setData] = useState({});

    const bg = {
        backgroundColor:"#F1F3F6",
        border:'none'
    }

    const handleForm = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newData = {...data};
        newData[field] = value;
        setData(newData);
    }

    const sendEmail = (e) => {
        e.preventDefault();
        
        emailjs.sendForm(`${REACT_APP_EMAIL_SERVICE_ID}`, `${REACT_APP_EMAIL_TEMPLATE_ID}`, e.target, `${REACT_APP_EMAIL_USER_ID}`,{data})
        .then((result) => {
            if(result.status === 200){
                Swal.fire(
                    data.firstName+' ' + data.lastName+ ' Your Message Successfully Send!',
                    'You clicked the button!',
                    'success'
                  )
            }
            e.target.reset();
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops... An Error Occured, Please Try Again',
                text: error.text,
              })
        });
    };

    return (
        <div className='py-5' style={{backgroundColor:"white"}} id='contact'>
            <p className='sm-tag'><Bounce top>Contact</Bounce></p>
            <p className='common-title text-color'>
                <Bounce left cascade>Let us handle your</Bounce>
                <Bounce right cascade> project,professionally</Bounce> 
            </p>
            <Container className='conatact-container'>
                <Form onSubmit={sendEmail}>
                    <div className='contact-form mx-auto mb-4'>
                        <Row xs={1} sm={2} md={2}>
                            <Col>
                                <Bounce left><Form.Control onBlur={handleForm} name="firstName" placeholder="First name"  className='mb-3' style={bg}/></Bounce>
                            </Col>
                            <Col>
                                <Bounce right><Form.Control onBlur={handleForm} name="lastName" placeholder="Last name"  className='mb-3' style={bg}/></Bounce>
                            </Col>
                            <Col>
                                <Bounce left><Form.Control onBlur={handleForm} name="email" type='email' placeholder="Email" className='mb-3' style={bg}/></Bounce>
                            </Col>
                            <Col>
                                <Bounce right><Form.Control onBlur={handleForm} name="phone" placeholder="Phone" className='mb-3' style={bg}/></Bounce>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Bounce bottom><Form.Control onBlur={handleForm} name="message" as="textarea" placeholder="Leave a comment here" style={bg}/></Bounce>
                            </Col>
                        </Row>
                    </div>
                    <Bounce bottom>
                        <Button type="submit" variant="transparent" className='log-btn'>Send Message</Button>
                    </Bounce>
                </Form>
            </Container>
        </div>
    );
};

export default Contact;