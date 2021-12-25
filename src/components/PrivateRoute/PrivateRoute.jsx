import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user,isLoading} = useAuth();
    if(isLoading){
        return <div className='d-flex justify-content-center align-items-center p-5' style={{backgroundColor:"white"}}>
            <Spinner animation="border" />
        </div>
    }
    return (
        user.email ? children :  <Navigate to="/login" />
    );
};

export default PrivateRoute;