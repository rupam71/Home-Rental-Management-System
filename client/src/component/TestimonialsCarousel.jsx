import React from 'react';
import { Carousel } from 'react-bootstrap';
import firstImage from './../Images/h1.jpg'
import secondImage from './../Images/h2.jpg'
import thirdImage from './../Images/h3.jpg'

const TestimonialsCarousel = () => {
    return (
        <div className="w-100">
            <Carousel interval={40000000} >
                <Carousel.Item>
                    <img
                        className="testimonialImage"
                        src={firstImage}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <p className='testimonialsQuote'>"I've recently rented an apartment through your site, and have been looked after by James Thompson. He provided me with the utmost support on every property issue. I will surely recommend your services to my friends!"</p> 
                        <h3 className='testimonialsAuthor'>Mehrin Afroj</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="testimonialImage"
                        src={secondImage}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <p className='testimonialsQuote'>"I have always found your team to be extremely prompt and professional with all dealings I have had with them. You always keep me updated on the progress of my apartment's rental. Thank you!"</p> 
                        <h3 className='testimonialsAuthor'>Pintu Islam</h3>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="testimonialImage"
                        src={thirdImage}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <p className='testimonialsQuote'>"Your property managers have been active in their response to repairs and always patient with our frustrations. You have always found us wonderful tenants. Thank you for the amazing customer service!"</p> 
                        <h3 className='testimonialsAuthor'>Marzuk Ahmed Rasel</h3>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default TestimonialsCarousel;