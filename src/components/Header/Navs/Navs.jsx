import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../Image_Icon/logo.png';
import './Navs.css';

const Navs = () => {
    const {user,signOutUser,orderList,admin} = useAuth();
 
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" variant='light' fixed='top' className='navBg'>
                <Container>
                <Navbar.Brand href="#home"><img src={logo} alt=""/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='me-auto text-center'>
                        <Nav.Link as={HashLink} to="/home" className='link'>Home</Nav.Link>
                        <Nav.Link as={HashLink} to="/home#projects" className='link'>Project</Nav.Link>
                        <Nav.Link as={HashLink} to="/home#contact" className='link'>Contact</Nav.Link>
                        <Nav.Link as={HashLink} to="/home#services" className='link'>Services</Nav.Link>
                        <Nav.Link as={HashLink} to="/home#about" className='link'>About Us</Nav.Link>
                        <Nav.Link as={HashLink} to="/dashboard#dashboard" className='link'>Dashboard</Nav.Link>
                    </Nav>
                    <Nav>
                        <div className='d-flex justify-content-center align-items-center'>
                            <span className='me-2'>{user.displayName}</span>
                        </div>
                        {!user.email ? <NavLink to="/login"><Button variant="transparent" className='log-btn'>Login</Button></NavLink>
                        :<Button onClick={signOutUser} variant="transparent" className='log-btn'>Log Out</Button>}
                    </Nav>
                    {!admin&&<Nav>
                            <div className='d-flex justify-content-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-nav" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h5 className='common-color fw-bold'>{orderList.length}</h5>
                            </div>
                        </Nav>}
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navs;