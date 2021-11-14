import axios from 'axios'
import { newError } from './error';
import authenticateToken from './../utility/authenticateToken';
import errorHandler from './../utility/errorHandler';

//CREATE SUPPORT TICKET
export const createSupportTicket = (value) => async dispatch => {
    authenticateToken()
    await axios.post('/api/supportticket', value)
    .then(res => 
        dispatch({
            type: 'CREATE_SUPPORT_TICKET',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Your Ticket Sent To The Admin Panel", "success")))
    .catch(err => errorHandler(err,dispatch))
}

export const changeStatus = () => dispatch =>{
    dispatch({
        type: 'CHANGE_STATUS'
    })
}

//Get Users all ticket
export const getUsersAllSupportTicket = (id) => async dispatch => {
    authenticateToken()
    await axios.get(`/api/supportticket/user/${id}`)
    .then(res => 
        dispatch({
            type: 'GET_SUPPORT_TICKET',
            payload: res.data
        })
    )
    .catch(err => errorHandler(err,dispatch))
}