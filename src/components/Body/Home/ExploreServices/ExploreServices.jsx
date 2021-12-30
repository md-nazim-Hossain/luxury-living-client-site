import React from 'react';
import useAuth from '../../../../hooks/useAuth';
import Bounce from 'react-reveal/Bounce';
import { Container, Row, Button, Spinner } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Service from '../Service/Service';

const ExploreServices = () => {
    const {services} = useAuth();

    if(!services.length){
        return <Spinner animation="border" className="m-5 p-5"/>
    }

    return (
        <div className='py-5 bg-light'>
            <Bounce top cascade><p className='sm-tag'>Service</p></Bounce>
            <p className='common-title text-color'>
                <Bounce left cascade>
                    We're an agency tailored to all
                </Bounce>
                <Bounce right cascade>
                    clients' needs that always delivers
                </Bounce>
            </p>
            <Container className='py-5'>
                <Row xs={1} sm={2} md={3}>
                    {
                        services.map(service => <Service
                         key={service._id}
                         service = {service}
                        ></Service>)
                    }
                </Row>
            </Container>
            <NavLink to='/'><Button variant="transparent" className='log-btn'>Back To Home</Button></NavLink>
        </div>
    );
};

export default ExploreServices;