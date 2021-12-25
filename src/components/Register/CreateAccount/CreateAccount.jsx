import React, { useState } from 'react';
import { Container, Form,Button,Image } from 'react-bootstrap';
import { NavLink,useLocation,useNavigate } from 'react-router-dom';
import './CreateAccount.css';
import google from '../../../Image_Icon/Icon/Group 573.png';
import useAuth from '../../../hooks/useAuth';

const CreateAccount = () => {

    const {signWithGoogle,createUser,setError,error} = useAuth();
    const [userDetails,setUserDetails] = useState({});
    const navigate = useNavigate()
    const location = useLocation();
    
    const {Lname,Fname,email,password,conPass} = userDetails;

    const handleUserDetails = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newUserDetails = {...userDetails};
        newUserDetails[field] = value;
        setUserDetails(newUserDetails);
    }
    const handleCreateForm = e =>{
        if(password === conPass){
            createUser(email,password,Fname,Lname,navigate,location);
            setError('');
        }else{
            setError('Password did\'nt match');
        }
        e.preventDefault();
    }
    return (
        <div className='py-5' style={{backgroundColor:"white"}}>
            <Container>
                <Form onSubmit={handleCreateForm}>
                    <div className='w-50 mx-auto border py-3 px-5'>
                        <h4 className='text-start pe-3 pb-3 text-color fw-bold'>Create an account</h4>
                        <Form.Control name='Fname' onBlur={ handleUserDetails } placeholder='First Name' className='mb-4 formControl' required/>
                        <Form.Control name='Lname' onBlur={ handleUserDetails } placeholder='Last Name' className='mb-4 formControl' required/>
                        <Form.Control name="email" onBlur={ handleUserDetails } type='email' placeholder='Email' className='mb-4 formControl' required/>
                        <Form.Control name="password" onBlur={ handleUserDetails } type='password' placeholder='Password' className='mb-4 formControl' required/>
                        <Form.Control name="conPass" onBlur={ handleUserDetails } type='password' placeholder='Confirm Password' className='mb-4 formControl' required/>
                        <p className='text-danger'>{error}</p>
                        <Button type='submit' variant="transparent" className='log-btn w-100 mb-4'>Create an account</Button>
                        <p className='text-color fw-bold'>Already have an account? <NavLink to='/login'>Login</NavLink></p>
                    </div>
                </Form>
                <h5 className='text-color fw-bold py-3'>Or</h5>
                <div className='w-50 mx-auto'>
                    <Button onClick={() =>signWithGoogle(navigate,location)} variant="transparent" className='w-75 mb-4 border rounded-pill fw-m-bold text-color'>
                        <Image src={google} className='me-3'/>
                        <span>Continue With Google</span>
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default CreateAccount;