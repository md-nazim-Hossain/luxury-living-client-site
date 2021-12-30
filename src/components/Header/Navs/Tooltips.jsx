import React, { useRef } from 'react';
import { useState } from 'react';
import { Overlay, Tooltip } from 'react-bootstrap';
import Swal from 'sweetalert2';

const Tooltips = ({target,show,notify,setNotify,setOrderList,orderList}) => {

    const [showNotify, setShowNotify] = useState(false);
    const targetNotify = useRef(null);

    const handleRemoveService = id =>{
        fetch(`https://floating-cliffs-41974.herokuapp.com/orderList/${id}`,{
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount){
                Swal.fire(
                    'Rate Us Service Review',
                    'Please Click The Button!',
                    'success'
                )
            };
            setNotify(notify.filter(notification => notification._id !== id));
            setOrderList(orderList.filter(order => order._id !== id));
        }).catch(e =>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...,An Occured Error! Please Try Again',
                text: e.message,
            })
        })
    };

    return (
        <div className='mt-1'>
            <Overlay target={target.current} show={show} placement="bottom">
            {(props) => (
            <Tooltip id="overlay-example" {...props}>
               {
                   notify.length ? notify.map(notification =><div key={notification._id}>
                       <div>
                           <span>{notification.serviceName} Service Got You ? </span>
                           <span ref={targetNotify} onClick={()=> setShowNotify(!showNotify)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                    <Overlay target={targetNotify.current} show={showNotify} placement="right">
                                    {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Processing
                                    </Tooltip>
                                        )}
                                    </Overlay>
                           </span>
                           <span onClick={()=>handleRemoveService(notification._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon green cursor" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                           </span>
                       </div>
                   </div>):
                   <p>No Notification Are Available</p>
               }
            </Tooltip>
            )}
        </Overlay>
        </div>
    );
};

export default Tooltips;