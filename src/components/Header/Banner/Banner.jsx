import React from 'react';
import { Col, Container, Image, Row,Button } from 'react-bootstrap';
import './Banner.css';
import {Zoom, Fade} from 'react-reveal';

const Banner = () => {
    return (
        <Container className='mt-5 pt-5'>
            <Row xs={1} sm={1} md={2}>
                <Col>
                    <div className='py-5 text-start mt-5 pe-5'>
                        <h1 className='titleTag text-color'>
                            <Zoom top cascade>We Build</Zoom>
                            <Zoom> Your Dream</Zoom>
                        </h1>
                        <p className='titlePara py-3 text-muted'>
                            <Zoom bottom cascade>
                                Online Easte Agency, the mordern way to sell your own home, You can use Griffin Residential to market your property
                            </Zoom>
                        </p>
                        <Zoom bottom>
                        <Button variant='transparent' className='log-btn'>Booking</Button>
                        </Zoom>
                    </div>
                </Col>
                <Col>
                   <div className='py-5'>
                        <Fade right cascade><Image src={`https://i.ibb.co/ZSZvH8X/banner.png`} className='img-fluid'/></Fade>
                   </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Banner;