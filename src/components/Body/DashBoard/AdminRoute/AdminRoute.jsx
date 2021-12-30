import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';

const AdminRoute = ({children}) => {
    const {admin, isLoading} = useAuth();

    if(isLoading){
        return <div className='d-flex justify-content-center align-items-center p-5' style={{backgroundColor:"white"}}>
            <Spinner animation="border" />
        </div>
    };
    if(!admin){
        return <div className='d-flex justify-content-center align-items-center p-5'>
            <Spinner animation="border" />
        </div>
    };

    return admin ? children : <Navigate to='/'/>
};

export default AdminRoute;