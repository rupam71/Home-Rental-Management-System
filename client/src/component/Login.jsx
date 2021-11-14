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
    console.log("login :: ",login)
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        if(login.password.length < 6) dispatch(newError("Password length must be atleast 6", "danger"))
        else if(!validEmail(login.email)) dispatch(newError("Email Not Valid", "danger")) 
        else dispatch(loginForm(login))
    }
    return ( 
        <div className='container mt-5'>
            <h1 className='text-center mb-5'> Login </h1>
            <form onSubmit={handleSubmit} className='mb-5'>
                <div class="form-row">
                    <Input width="full"
                        change={e=>setlogin({...login, email:e})}
                        type="text" label='Email' value={login.email}/>
                    <Input width="full"
                        change={e=>setlogin({...login, password:e})}
                        type="password" label='Password' value={login.password}/>
                </div>
                <button type="submit" class="btn btn-primary btn-lg my-3">Login</button>
                <br/>
                <Link to="/signup" >No Active Account? Create Here...</Link>
            </form>
        </div>
     );
}
 
export default Login;