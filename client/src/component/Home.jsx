import React from 'react';
import CarouselDesign from './CarouselDesign';
import Newslatter from './Newslatter';
import Testimonials from './Testimonials';

const Home = () => {
    const WhyRender = ({icon,heading,text}) => {
        return <div className="col-md-6 col-lg-4 p-3">
                    <i className={`my-3 ${icon}`} style={{fontSize:'5rem', color:'#1CC1C1'}}></i>
                    <p className='colHeading'>{heading}</p>
                    <p className='welocomeText'>{text}</p>
                </div>
    }
    return (
        <div>
            <CarouselDesign />
            <div className='welocome text-center'>
                <p className='welocomeSmallHeading'>WELCOME TO THE</p>
                <p className='welocomeHeading'>Best Real Estate Agency</p>
                <p className='welocomeText'>Basa Vara Chai is a full-service, luxury real estate brokerage and lifestyle company representing clients worldwide in a broad spectrum of classes, including residential, new development, resort real estate, residential leasing and luxury vacation rentals. Since our inception in 2011, we have redefined the business of real estate, modernizing and advancing the industry by fostering a culture of partnership, in which all clients and listings are represented by our agents.</p>
            </div>
            <div className='welocome text-center' style={{backgroundColor:'white'}}>
                <p className='welocomeSmallHeading'>Why choose us</p>
                <p className='welocomeHeading'>6 Reasons to Choose Basa Vara Chai</p>
                <p className='welocomeText'>Annually, thousands of clients choose Basa Vara Chai as their real estate agency. Besides having years of experience in real estate industry, there is a variety of reasons why residents over the world choose us. Here are just some of them.</p>
                <div className="row">
                    <WhyRender 
                        icon={'fas fa-users'}
                        heading={'Professional & Friendly Agents'}
                        text={'Our agents are experienced and understanding experts who deliver fresh and effective solutions.'}
                    />
                    <WhyRender 
                        icon={'fas fa-map-marked-alt'}
                        heading={'Property from Anywhere'}
                        text={'With Basa Vara Chai, you can search for a desired property from any location.'}
                    />
                    <WhyRender 
                        icon={'fas fa-procedures'}
                        heading={'Well-furnished Interiors'}
                        text={'All our properties are furnished and decorated to meet your needs and expectations.'}
                    />
                    <WhyRender 
                        icon={'fas fa-headset'}
                        heading={'Get support when you need it'}
                        text={'Basa Vara Chai’s support experts are always ready to help you and answer your questions.'}
                    />
                    <WhyRender 
                        icon={'fas fa-receipt'}
                        heading={'Checked & Pre-inspected Properties'}
                        text={'All our properties are inspected to make sure they meet all standards and state regulations.'}
                    />
                    <WhyRender 
                        icon={'fas fa-home'}
                        heading={'Affordable Property Pricing'}
                        text={'We offer reasonable pricing policy on all our residential properties across the USA.'}
                    />
                </div>
            </div>
            <Testimonials/>
            <Newslatter/>
        </div>
    );
}

export default Home;
