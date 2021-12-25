import React from 'react';
import { Card, Col, Button} from 'react-bootstrap';
import styles from './Service.module.css';
import Bounce from 'react-reveal/Bounce';
import {NavLink} from 'react-router-dom';

const Service = ({service}) => {
    const {_id,name,img,cost,details} = service;
    const link = `/addToCart/${_id}`
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
                            <NavLink to={link}>
                                <Button variant='outline-secondary'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>add to cart
                                </Button>
                            </NavLink>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Bounce>
        </Col>
    );
};

export default Service;