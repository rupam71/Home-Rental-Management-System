import React,{useState} from 'react';
import Input from './Input';
import Dropdown from './Dropdown';
import { useDispatch } from 'react-redux';
import { newError } from '../actions/error';
import validEmail from './../utility/validEmail';
import { signUpForm } from './../actions/index';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [signup, setsignup] = useState({
        name:'',
        email:'',
        password:'',
        phoneNumber:'',
        address:'',
        gender:'',
        dateOfBirth:''
    });
    const [confirm, setconfirm] = useState({
        password:''
    })
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        if(!signup.name) dispatch(newError("Name is required", "danger"))
        else if(signup.password.length < 6) dispatch(newError("Password length must be atleast 6", "danger"))
        else if(signup.password !== confirm.password) dispatch(newError("Confirm Password not matched", "danger"))
        else if(!validEmail(signup.email)) dispatch(newError("Email Not Valid", "danger")) 
        else dispatch(signUpForm(signup))
    }
    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-5'> Signup </h2>
            <form onSubmit={handleSubmit} className='mb-5'>
                <div className="form-row">
                    <Input
                    change={e=>setsignup({...signup, name:e})}
                    type="name" label='Name' value={signup.name}/>
                    <Input
                    change={e=>setsignup({...signup, email:e})}
                    type="text" label='Email' value={signup.email}/>
                    <Input
                    change={e=>setsignup({...signup, password:e})}
                    type="password" label='Password' value={signup.password}/>
                    <Input
                    change={e=>setconfirm({...confirm, password:e})}
                    type="password" label='Confirm Password' value={confirm.password}/>
                    <Dropdown 
                    change={e=>setsignup({...signup, gender:e})}
                    name={"Gender"} option={['male','female']} />
                    <Input
                    change={e=>setsignup({...signup, dateOfBirth:e})}
                    type="date" label='Date Of Birth' value={signup.dateOfBirth}/>
                    <Input width="full"
                    change={e=>setsignup({...signup, phoneNumber:e})}
                    type="text" label='Phone Number' value={signup.phoneNumber}/>
                    <Input width="full"
                    change={e=>setsignup({...signup, address:e})}
                    type="text" label='Address' value={signup.address}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                <br/>
                <Link to="/login" >Already Have An Account? Login Here...</Link>
            </form>
        </div>
    );
}

export default Signup;