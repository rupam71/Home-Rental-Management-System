import React,{useState} from 'react';
import Input from './Input';
import { useDispatch } from 'react-redux';
import { newError } from '../actions/error';
import validEmail from './../utility/validEmail';
import { loginForm } from './../actions/index';
import { Link } from 'react-router-dom';

const Login = () => {
    const [login, setlogin] = useState({
        email:'',
        password:''
    });
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        if(login.password.length < 6) dispatch(newError("Password length must be atleast 6", "danger"))
        else if(!validEmail(login.email)) dispatch(newError("Email Not Valid", "danger")) 
        else dispatch(loginForm(login))
    }
    return ( 
        <div className='container mt-5'>
            <h2 className='text-center mb-5'> Login </h2>
            <form onSubmit={handleSubmit} className='mb-5'>
                <div className="form-row">
                    <Input width="full"
                        change={e=>setlogin({...login, email:e})}
                        type="text" label='Email' value={login.email}/>
                    <Input width="full"
                        change={e=>setlogin({...login, password:e})}
                        type="password" label='Password' value={login.password}/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
                <br/>
                <Link to="/signup" >No Active Account? Create Here...</Link>
            </form>
        </div>
     );
}
 
export default Login;