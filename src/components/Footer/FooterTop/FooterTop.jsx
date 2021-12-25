import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import pin1 from '../../../Image_Icon/Icon/map-pin-2-fill.png';
import fb from '../../../Image_Icon/Icon/Vector.png';
import instra from '../../../Image_Icon/Icon/Vector-1.png';
import linkedIn from '../../../Image_Icon/Icon/Vector-2.png';
import youtube from '../../../Image_Icon/Icon/Vector-3.png';

const FooterTop = () => {
    return (
        <Container style={{fontSize:'16px',fontWeight:'500'}} className='py-5'>
            <Row xs={1} sm={2} md={4}>
                <Col md={4}>
                    <p><Image src={pin1} style={{width:'24px'}}/> H#000 (0th Floor), Road #00,New DOHS, Mohakhali, Dhaka, Bangladesh</p>
                </Col>
                <Col md={2}>
                    <div className='text-start'>
                        <h3>Company</h3>
                        <p>About</p>
                        <p>Project</p>
                        <p>Our Team</p>
                        <p>Terms Condition</p>
                        <p>Submit Listing</p>
                    </div>
                </Col>
                <Col md={2}>
                    <div className='text-start'>
                        <h3>Quik Links</h3>
                        <p>Quick Links</p>
                        <p>Rentals</p>
                        <p>Sales</p>
                        <p>Contact</p>
                        <p>Our Blog</p>
                    </div>
                </Col>
                <Col md={4}>
                    <div className='text-start'>
                        <h3>About Us</h3>
                        <p>We are Sales Luxury Living apartment. we are provide whole bangladesh,You Buy Luxury Living Apartment about low cost</p>
                    </div>
                    <div className='text-start'>
                        <Image src={fb} style={{width:'24px',marginRight:'10px'}}/>
                        <Image src={instra} style={{width:'24px',marginRight:'10px'}}/>
                        <Image src={linkedIn} style={{width:'24px',marginRight:'10px'}}/>
                        <Image src={youtube} style={{width:'24px'}}/>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FooterTop;