import React,{useState} from 'react';
import validEmail from '../utility/validEmail';
import { useDispatch } from 'react-redux';
import { newError } from '../actions/error';

const Newslatter = () => {
    const dispatch= useDispatch()
    const [emailState, setemailState] = useState({
        email:''   
    });
    const handleSubmit = e => {
        e.preventDefault();
        if(!validEmail(emailState.email)) dispatch(newError("Email Not Valid", "danger")) 
        console.log("Email State ::: ",emailState)
    }
    return ( 
        <div className="newslatter">
            <div className="row justify-content-sm-center justify-content-md-center align-items-lg-center justify-content-xl-between">
                <div className="col-sm-10 col-md-10 col-lg-6">
                    <p className="newslatterHeading text-center">Sign Up our Newsletter</p>
                    <p className="newslatterText text-center">And Never Miss Our Special Offer And News!</p>
                </div>
                <div className="col-sm-10 col-md-10 col-lg-6">
                    <form onSubmit={handleSubmit} className="newslatterForm d-flex">
                        <input
                            type='email'
                            className="form-control eamilInput"
                            placeholder={`Enter Your Email`}
                            required
                            onChange={e=>setemailState({...emailState, email:e.target.value})}
                            value={emailState.email}
                        />
                        <button type='submit' className="btn btn-outline-light">Subscribe</button>
                    </form>
                </div>
            </div>
        </div>
     );
}
 
export default Newslatter;