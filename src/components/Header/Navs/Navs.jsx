import React, { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Container, Nav, Navbar, } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../Image_Icon/logo.png';
import './Navs.css';
import Tooltips from './Tooltips';

const Navs = () => {
    const {user,signOutUser,orderList,admin,setOrderList} = useAuth();
    const [notify,setNotify] = useState([]);
    const [show, setShow] = useState(false);
    const target = useRef(null);
    
    useEffect(()=>{
        orderList.length && setNotify(orderList.filter(order => order?.deliveryStatus === 'Delivered'))
    },[orderList]);

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
                        {!user.email ? <HashLink to="/login#logIn"><Button variant="transparent" className='log-btn'>Login</Button></HashLink>
                        :<Button onClick={signOutUser} variant="transparent" className='log-btn'>Log Out</Button>}
                    </Nav>
                    {!admin&&<Nav>
                            <div className='d-flex justify-content-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-nav" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <h5 className='common-color fw-bold'>{orderList.length}</h5>
                            </div>
                            <div className='d-flex justify-content-center cursor' ref={target}  onClick={()=> setShow(!show)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-nav" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <h5 className='common-color fw-bold'>{notify.length}</h5>
                            </div>
                            <Tooltips 
                                target={target} 
                                show={show} 
                                notify={notify} 
                                setNotify={setNotify}
                                setOrderList={setOrderList}
                                orderList={orderList}
                            ></Tooltips>
                        </Nav>}
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navs;