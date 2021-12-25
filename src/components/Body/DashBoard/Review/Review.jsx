import React, { useState } from 'react';
import { Form,Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import useAuth from '../../../../hooks/useAuth';

const Review = () => {
    const [review,setReview] = useState({});
    const {user} = useAuth();
    
    const handleFieldName = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newReview = {...review}
        newReview[field] = value;
        setReview(newReview);
    };

    const handleReview = e =>{
        fetch('http://localhost:5000/reviews',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(review)
        })
        .then(res => res.json())
        .then(data => {
            if(data.insertedId){
                Swal.fire(
                    user.displayName + ' Review Successfully Sent!',
                    'You clicked the button!',
                    'success'
                  );
                  setReview({});
                  e.target.reset();
            }
        });
        e.preventDefault();
    }

    return (
        <div className='p-5 w-50'>
            <Form onSubmit={handleReview}>
                <Form.Control onBlur={handleFieldName} name="name" placeholder='Your Name' required className='mb-3 border-0'/>
                <Form.Control onBlur={handleFieldName} name="designation" placeholder='Company Name Designation' required className='mb-3 border-0'/>
                <Form.Control onBlur={handleFieldName} name="img" placeholder='Image Link' required className='mb-3 border-0'/>
                <Form.Control onBlur={handleFieldName} name="rating" type='number' placeholder='Rating' required min="1" max="5" className='mb-3 border-0'/>
                <Form.Control onBlur={handleFieldName} name="name" as='textarea' placeholder='description' required className='mb-3 border-0'/>
                <div className='text-start'><Button type='submit' variant="transparent" className='log-btn'>Submit</Button></div>
            </Form>
        </div>
    );
};

export default Review;