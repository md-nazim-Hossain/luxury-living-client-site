import React from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import styles from './Service.module.css';
import Bounce from 'react-reveal/Bounce';
import {NavLink} from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

const Service = ({service}) => {
    const {_id,name,img,cost,details} = service;
    const {admin} = useAuth();
    const link = `/addToCart/${_id}`;

    const handleAction = () =>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...,Don\'t work add to cart action !',
            text: "Admin don't will be able to add to cart service!",
        });
    }

    return (
        <Col className='mb-4'>
            <Bounce left>
                <Card className={styles.card}>
                    <Card.Img variant="top" src={img} style={{width:'78px',height:"78px"}} className='mx-auto'/>
                    <Card.Body>
                        <Card.Title>
                            <p className='project-name'>{name}</p>
                            <p className='project-name'>${cost}</p>
                        </Card.Title>
                        <Card.Text>
                            <p className='titlePara py-3 text-muted'>{details}</p>
                            {!admin ? <NavLink to={link}>
                                <Button variant='outline-secondary'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>add to cart
                                </Button>
                            </NavLink>:
                            <Button variant='outline-secondary' onClick={handleAction}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>add to cart
                            </Button>}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Bounce>
        </Col>
    );
};

export default Service;