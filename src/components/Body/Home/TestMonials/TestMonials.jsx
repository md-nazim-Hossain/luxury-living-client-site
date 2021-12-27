import React, { useEffect, useState } from 'react';
import SwiperCore, {Pagination} from 'swiper';
import { Swiper,SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import "./styles.css";
import { Card } from 'react-bootstrap';
import Rating from 'react-rating';

SwiperCore.use([Pagination]);

const TestMonials = () => {
    const [reviews,setReviews] = useState([]);

    useEffect(() =>{
        fetch('https://floating-cliffs-41974.herokuapp.com/reviews')
        .then(res => res.json())
        .then(data => setReviews(data));
    },[]);

    const fullStar = <i className="fas fa-star"></i>;
    const halfStar = <i className="far fa-star"></i>;

    return (
        <div style={{backgroundColor:"#E5E5E5"}} className='p-5'>
            <p className="common-title text-color py-4">Testmonials</p>
            <Swiper slidesPerView={3} spaceBetween={30} pagination={{
                "clickable": true
                }} className="mySwiper p-5"
                breakpoints={{
                    300:{
                        width:300,
                        slidesPerView: 1,
                    },
                    // when window width is >= 640px
                    640: {
                      width: 640,
                      slidesPerView: 1,
                      spaceBetween:10
                    },
                    // when window width is >= 768px
                    768: {
                      width: 768,
                      slidesPerView: 2,
                      spaceBetween:20
                    },
                  }}
                >
                    {
                        reviews.map(review => <SwiperSlide
                            key={review._id}
                            className='border rounded h-100'
                         >
                                <Card className='testMonials w-100'>
                                    <div className='d-flex align-items-center'>
                                        <Card.Img variant="top" src={review.img} className='me-2'/>
                                        <div className='text-start mt-2'>
                                            <Card.Title><p className='text-color fw-bold mb-0 pb-0'>{review.name}</p></Card.Title>
                                            <p className='text-color'>{review.designation}</p>
                                        </div>
                                    </div>
                                    <Card.Body>
                                    <Card.Text>
                                        <p className='text-start text-muted'>{review.description}</p>
                                    </Card.Text>
                                        <p className='text-warning text-start'>
                                            <Rating
                                            initialRating={review.rating}
                                            readonly
                                            emptySymbol={halfStar}
                                            fullSymbol= {fullStar}
                                            
                                            />
                                        </p>
                                    </Card.Body>
                                </Card>
                            </SwiperSlide>
                        )
                    }
            </Swiper>
        </div>
    );
};

export default TestMonials;