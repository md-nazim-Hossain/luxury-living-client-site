import React from 'react';
import { Col, Container, Row, Image,Spinner } from 'react-bootstrap';
import logo from '../../../../Image_Icon/logo.png';
import style from './DashBoard.module.css';
import { NavLink,Outlet } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

const DashBoard = () => {
    const {user,admin,isLoading} = useAuth();
    const [title,setTitle] = useState('');
    
    if(isLoading){
        return <Spinner animation="border" className="m-5 p-5"/>
    };

    return (
        <div className='py-3' style={{backgroundColor:"white"}} id='dashboard'>
            <Helmet>
                <title>Dashboard | Luxury Living</title>
            </Helmet>
            <Container>
                <div className={style.mobileDevicesHide}>
                    <Row xs={1} md={3}>
                        <Col md={3}><Image src={logo}/></Col>
                        <Col className="ps-5"><p className={style.dashBoardList}>{title ? title: "Dashboard"}</p></Col>
                        <Col className="text-end"><p className={style.dashBoardList}>{user.displayName}</p></Col>
                    </Row>
                </div>
                <Row xs={1} md={2}>
                    <Col md={3} className='pt-5 text-start'>
                        {!admin ? <div className={style.dashBoardMenu}>
                            <p>
                                <NavLink to='booking' className={style.dashBoardColor} 
                                    style={({ isActive }) => {
                                        return {
                                        color: isActive ? "#251D58" : "#878787",
                                        fontWeight:700,
                                        title:isActive && setTitle("Booking")
                                        };
                                    }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg><span>Booking</span></NavLink>
                            </p>
                            <p>
                                <NavLink to='bookLists' className={style.dashBoardColor}
                                    style={({ isActive }) => {
                                        return {
                                        color: isActive ? "#251D58" : "#878787",
                                        fontWeight:700,
                                        title:isActive && setTitle("Booking List"),
                                        };
                                    }}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg><span>Booking List</span></NavLink>
                            </p>
                            <p>
                                <NavLink to='review' className={style.dashBoardColor} 
                                    style={({ isActive }) => {
                                        return {
                                        color: isActive ? "#251D58" : "#878787",
                                        fontWeight:700,
                                        title:isActive && setTitle("Review")
                                        };
                                    }}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg><span>Review</span></NavLink>
                            </p>
                        </div>
                        :
                        <div className={style.dashBoardMenu}>
                            <p>
                                <NavLink to='orderLists' className={style.dashBoardColor} 
                                    style={({ isActive }) => {
                                        return {
                                        color: isActive ? "#251D58" : "#878787",
                                        fontWeight:700,
                                        title:isActive && setTitle("Order List")
                                        };
                                    }}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg><span className={style.adminMenu}>Order lists</span></NavLink>
                            </p>
                            <p>
                                <NavLink to='addService' className={style.dashBoardColor}
                                    style={({ isActive }) => {
                                        return {
                                        color: isActive ? "#251D58" : "#878787",
                                        fontWeight:700,
                                        title:isActive && setTitle("Add Service")
                                        };
                                    }}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg><span className={style.adminMenu}>Add Service</span></NavLink>
                            </p>
                            <p>
                                <NavLink to='makeAdmin' className={style.dashBoardColor} 
                                    style={({ isActive }) => {
                                        return {
                                        color: isActive ? "#251D58" : "#878787",
                                        fontWeight:700,
                                        title:isActive && setTitle("Make Admin")
                                        };
                                    }}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                </svg><span className={style.adminMenu}>Make Admin</span></NavLink>
                            </p>
                            <p>
                                <NavLink to='manageServices' className={style.dashBoardColor} 
                                    style={({ isActive }) => {
                                        return {
                                        color: isActive ? "#251D58" : "#878787",
                                        fontWeight:700,
                                        title:isActive && setTitle("Manage Services")
                                        };
                                    }}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className={style.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg><span className={style.adminMenu}>Manage Services</span></NavLink>
                            </p>
                        </div>}
                    </Col>
                    <Col md={9}>
                        <div className={style.dashBoardBgColor}>
                            <Outlet/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DashBoard;