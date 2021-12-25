import React from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import Bounce from 'react-reveal/Bounce';
import Service from '../Service/Service';
import useAuth from '../../../../hooks/useAuth';
import { NavLink } from 'react-router-dom';

const Services = () => {

    const {services} = useAuth();

    return (
        <div className='py-5 bg-light' id='services'>
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
                        services.slice(0,3).map(service => <Service
                         key={service._id}
                         service = {service}
                        ></Service>)
                    }
                </Row>
            </Container>
            <NavLink to='/explore'><Button variant="transparent" className='log-btn'>Explore More</Button></NavLink>
        </div>
    );
};

export default Services;