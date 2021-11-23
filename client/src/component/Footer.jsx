import React from 'react';

const Footer = () => {
    return ( 
        <div className='footer'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-7">
                        <p className="footerText">Basa Vara Chai is a full-service, luxury real estate brokerage and lifestyle company representing clients worldwide in a broad spectrum of classes, including residential, new development, resort real estate, residential leasing and luxury vacation rentals.</p>
                        <p className="footerText mt-5">© 2021.  Estancy. All Right Reserved. Privacy Policy</p>
                    </div>
                    <div className="col-sm-5">
                        <div className="d-flex flex-row">
                            <div className="p-2 footerText"><i className="fas fa-map-marker-alt footerIcon"></i></div>
                            <div className="p-2 footerText">432/9, Seworapara, Mirpur, Dhaka</div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="p-2 footerText"><i className="fas fa-phone-alt footerIcon"></i></div>
                            <div className="p-2 footerText">+88 01697 846 215</div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="p-2 footerText"><i className="fas fa-envelope footerIcon"></i></div>
                            <a href="mailto:info@basavarachai.com"><div className="p-2 footerText mail">info@basavarachai.com</div></a>
                        </div>
                        <div className="d-flex flex-row">
                            <div className="p-2 footerText"><a href="http://facebook.com/profile" target="_blank"><i className="fab fa-facebook-square footerSocialIcon"></i></a></div>
                            <div className="p-2 footerText"><a href="http://instagram.com" target="_blank"><i className="fab fa-instagram footerSocialIcon"></i></a></div>
                            <div className="p-2 footerText"><a href="http://twitter.com" target="_blank"><i className="fab fa-twitter footerSocialIcon"></i></a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;