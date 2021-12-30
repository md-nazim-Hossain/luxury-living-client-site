import React, { useState} from 'react';
import { Container, Form, Button, Image } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import google from '../../../Image_Icon/Icon/Group 573.png';
import logo from '../../../Image_Icon/logo.png'

const LogIn = () => {
    const [email,setEmail] = useState('');
    const [pass,setPass] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const {signWithGoogle,signUserWithEmailPass,error} = useAuth();

    const handleSignUser = e =>{
        signUserWithEmailPass(email,pass,navigate,location);
        e.preventDefault();
    };

    return (
        <div className='py-5' style={{backgroundColor:'white'}} id='logIn'>
            <Container>
                <Form onSubmit={handleSignUser}>
                    <Image src={logo} className='py-5'/>
                    <div className='responsive-width mx-auto border'>
                        <h4 className='text-start pe-3 pb-3 text-color fw-bold'>Login your account</h4>
                        <Form.Control onBlur={e =>setEmail(e.target.value)} type='email' placeholder='Username or Email' className='mb-4 formControl'/>
                        <Form.Control onBlur={e =>setPass(e.target.value)} type='password' placeholder='Password' className='mb-4 formControl'/>
                        <p className='text-danger'>{error}</p>
                        <Button type='submit' variant="transparent" className='log-btn w-100 mb-4'>Login</Button>
                        <p className='text-color'>Don't have an account? <NavLink to='/register'>Create an account</NavLink></p>
                    </div>
                </Form>
                <h5 className='text-color fw-bold py-3'>Or</h5>
                <div className='responsive-width mx-auto'>
                    <Button style={{backgroundColor:"white"}} onClick={()=>signWithGoogle(navigate,location)} variant="transparent" className='google-btn mb-4 border rounded-pill fw-m-bold text-color'>
                        <Image src={google} className='me-3'/>
                        <span>Continue With Google</span>
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default LogIn;