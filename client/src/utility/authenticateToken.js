import axios from 'axios'

export default function authenticateToken (){
    if(localStorage.hrms) axios.defaults.headers.common['x-auth-token'] = localStorage.hrms
    else delete axios.defaults.headers.common['x-auth-token'];
}