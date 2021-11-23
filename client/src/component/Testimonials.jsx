import React from 'react';
import TestimonialsCarousel from './TestimonialsCarousel';

const Testimonials = () => {
    return ( 
        <div className='testimonials text-center text-white'>
            <h2 className='testimonialsSmallHeading'>WHAT OUR CLIENTS SAY</h2>
            <h2 className='testimonialsHeading'>Testimonials</h2>
            <TestimonialsCarousel />
        </div>
     );
}
 
export default Testimonials;