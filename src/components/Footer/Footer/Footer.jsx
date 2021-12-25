import React from 'react';
import { Container } from 'react-bootstrap';
import FooterEnd from '../FooterEnd/FooterEnd';
import FooterTop from '../FooterTop/FooterTop';

const Footer = () => {
    return (
        <div style={{backgroundColor:"#251d58",color:"white"}}>
            <Container>
                <FooterTop></FooterTop>
                <FooterEnd></FooterEnd>
            </Container>
        </div>
    );
};

export default Footer;