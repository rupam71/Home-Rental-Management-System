import axios from 'axios'
import { newError } from './error';
import authenticateToken from './../utility/authenticateToken';
import errorHandler from './../utility/errorHandler';
import history from './../history.js'

//CREATE Rent
export const createRent = (value) => async dispatch => {
    authenticateToken()
    await axios.post('/api/rent', value)
    .then(res => 
        dispatch({
            type: 'CREATE_RENT',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("You Rent This House", "success")))
    .then(res=> history.push('/profile'))
    .catch(err => errorHandler(err,dispatch))
}

//Get rent by house seeker
export const getAllRent = (id) => async dispatch => {
    authenticateToken()
    await axios.get(`/api/rent/view/${id}`)
    .then(res => 
        dispatch({
            type: 'GET_ALL_RENT',
            payload: res.data
        })
    )
    .catch(err => errorHandler(err,dispatch))
}