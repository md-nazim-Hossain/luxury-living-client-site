import React, {useState} from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

const AddService = () => {
    const [addService, setAddService] = useState({});
    const {user} = useAuth();

    const uploadBtn = {
        padding:"3px 10px",
        border:'1px solid #231c55',
        color:'#231c55',
        fontSize:"14px",
        backgroundColor:"#dad7ef"
    };
    const uploadImg={
        width:'16px',
        height:"16px",
        display:"inline",
        color:'#231c55',
        marginRight:"4px"
    };
    const getServiceData = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newAddService = {...addService}
        newAddService[field] = value;
        setAddService(newAddService);
    };

    const submitAddService = e =>{
        e.preventDefault();
        console.log(addService)
      fetch('https://floating-cliffs-41974.herokuapp.com/services',{
          method:"POST",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify(addService)
      })
      .then(res => res.json())
      .then(data =>{
          if(data.insertedId){
            Swal.fire(
                user.displayName+' Your Service Added Successfull!',
                'Please Click The Button!',
                'success'
              )
          }
          e.target.reset();
      }).catch((er) =>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...,An Occured Error, Please Try Again !',
            text: er.message,
          })
      })
    };

    return (
        <div className='p-4'>
           <Form onSubmit={submitAddService} className='text-start p-4' style={{backgroundColor:"white",borderRadius:"15px"}}>
                <Row xs={1} md={2}>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Service Title</Form.Label>
                            <Form.Control name="name" onBlur={getServiceData} placeholder="Enter Title Name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <div className='mt-4 pt-2'>
                            <Button file='true' variant='transparent' style={uploadBtn}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={uploadImg} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>Upload image</Button></div>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Cost</Form.Label>
                            <Form.Control name="cost" onBlur={getServiceData} placeholder="Enter Cost Of Service" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Image</Form.Label>
                            <Form.Control name="img" onBlur={getServiceData} placeholder="Enter image link" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="details" onBlur={getServiceData} as="textarea" rows={3} placeholder='Enter Description'/>
                        </Form.Group>
                    </Col>
                </Row>
                <div className='text-end pt-3'><Button type='submit' variant="transparent" className='log-btn'>Submit</Button></div>
            </Form>
        </div>
    );
};

export default AddService;