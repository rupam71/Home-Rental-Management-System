import React from 'react';
import { Carousel } from 'react-bootstrap';
import firstImage from './../Images/first.jpg'
import secondImage from './../Images/second.jpg'
import thirdImage from './../Images/third.jpg'

const CarouselDesign = () => {
    return (
        <div className="container-fluid">
            <Carousel interval={40000000} >
                <Carousel.Item>
                    <img
                        className="d-block w-100 caroselImage"
                        src={firstImage}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <p className='carouselSmallHeading'>WE OFFER LOTS OF</p>
                        <h3 className='carouselHeading'>Luxury Amenities</h3>
                        <p className='carouselSmallText'>Every property we sell has numerous amenities that only add to your comfort and create a great atmosphere.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 caroselImage"
                        src={secondImage}
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <p className='carouselSmallHeading'>A VARIETY OF</p>
                        <h3 className='carouselHeading'>New Properties</h3>
                        <p className='carouselSmallText'>We daily update our property catalog with new properties of all kinds to help you find your dream house.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 caroselImage"
                        src={thirdImage}
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <p className='carouselSmallHeading'>WE ARE A TEAM OF</p>
                        <h3 className='carouselHeading'>Qualified Brokers</h3>
                        <p className='carouselSmallText'>We employ highly-qualified brokers and real estate agents who are always ready to help you achieve your commercial real estate estate goals.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}

export default CarouselDesign;