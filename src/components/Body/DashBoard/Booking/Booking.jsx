import React, {useState} from 'react';
import { useEffect } from 'react';
import { Form, Image, } from 'react-bootstrap';
import useAuth from '../../../../hooks/useAuth';
import creaditCard from '../../../../Image_Icon/Icon/creaditCard.png';
import paypal from '../../../../Image_Icon/Icon/image 17.png';
import Payment from '../Payment/Payment';

const Booking = () => {
    const {user,orderList} = useAuth();
    const [isChecked,setIsChecked] = useState(false);
    const [checkedId,setCheckedId] = useState('');
    const [orderPay,setOrderPay] = useState();
    const [serviceName,setServiceName] = useState({});
    const [customer,setCustomer] = useState({customerName:user.displayName,bookingEmail:user.email});

    useEffect(()=>{
        orderList.length && setOrderPay(orderList.find(order => order.serviceName === serviceName && order.payment === false))
    },[orderList,serviceName]);

    // Change Form field
    const handleChange = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newCustomer = {...customer};
        newCustomer[field] = value;
        setCustomer(newCustomer);

    };
    //Checked system 
    const handleChecked = (e) =>{
        setIsChecked(isChecked);
        setCheckedId(e.target.id);
    }

    return (
        <div className='p-5 pb-2'>
            <Form>
                <Form.Control name="customerName" onChange={handleChange} value={customer.customerName} placeholder='Name' required className='mb-3 border-0'/>
                <Form.Control name="bookingEmail" onChange={handleChange} value={customer.bookingEmail} placeholder='Email' required className='mb-3 border-0'/>
                <Form.Control onChange={e => setServiceName(e.target.value)} placeholder='Service Name' required className='mb-3 border-0'/>
                <p className='text-muted text-start my-1'>Pay With</p>
                <div className='d-flex'>
                    <p className='d-flex me-5'>
                        <Form.Check
                            type="radio"
                            label="Card"
                            name="payment"
                            id="creaditCard"
                            checked={isChecked}
                            onChange={handleChecked}
                            disabled={!orderPay?.serviceCost}
                        />
                        <Image src={creaditCard}/>
                    </p>
                    <p className='d-flex'>
                        <Form.Check
                            type="radio"
                            label="PayPal"
                            name="payment"
                            id="payPal"
                            checked={isChecked}
                            onChange={handleChecked}
                            disabled={!orderPay?.serviceCost}
                        />
                        <Image src={paypal}/>
                    </p>
                </div>
            </Form>
            <div>
                {checkedId === "creaditCard"? <Payment order={orderPay}></Payment>:""}
            </div>
        </div>
    );
};

export default Booking;