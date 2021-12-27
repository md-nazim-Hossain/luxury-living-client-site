import React from 'react';
import { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

const MakeAdmin = () => {
    const {user,setError} = useAuth();
    const [email,setEmail] = useState({});
    const handleEmail = e =>{
        setEmail(e.target.value);
    }
    const handleAdmin = e =>{
        e.preventDefault();
        fetch('https://floating-cliffs-41974.herokuapp.com/users/admin',{
            method:"PUT",
            headers:{
              "content-type":"application/json"
            },
            body:JSON.stringify({email})
          })
          .then(res => res.json())
          .then(result =>{
            if(result.modifiedCount){
              Swal.fire(
                user.displayName+' Admin Make Successfull!',
                'Please Click The Button!',
                'success'
              )
              e.target.reset();
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
              })
            }
          }).catch((e) =>{
            setError(e.message)
          })
    }

    return (
        <div className='p-4'>
           <Container className='p-5' style={{backgroundColor:"white",borderRadius:"15px"}}>
               <Form onSubmit={handleAdmin}>
                   <Row xs={1} sm={1} md={2}>
                     <Col xs={12} md={9}>
                        <Form.Control onBlur={handleEmail} type='email' required placeholder='jhon@gmail.com' className='mt-2 p-2'/>
                     </Col>
                     <Col xs={12} md={3}><div className='text-end my-2'><Button type='submit' variant="transparent" className='log-btn'>Submit</Button></div></Col>
                   </Row>
               </Form>
           </Container>
        </div>
    );
};

export default MakeAdmin;