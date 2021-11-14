import axios from 'axios'
import { newError } from './error';
import authenticateToken from './../utility/authenticateToken';
import errorHandler from './../utility/errorHandler';

//CREATE Review
export const createReview = (value) => async dispatch => {
    authenticateToken()
    await axios.post('/api/ratings', value)
    .then(res => 
        dispatch({
            type: 'CREATE_REVIEW',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Your Review is Added", "success")))
    .catch(err => errorHandler(err,dispatch))
}

////view all ratings of a single house
export const getHouseReview = (id) => async dispatch => {
    await axios.get(`/api/ratings/h/${id}`)
    .then(res => 
        dispatch({
            type: 'GET_REVIEW',
            payload: res.data
        })
    )
    .catch(err => errorHandler(err,dispatch))
}

////view ratingsby ID
export const getReviewById = (id) => async dispatch => {
    await axios.get(`/api/ratings/${id}`)
    .then(res => 
        dispatch({
            type: 'EDIT_REVIEW',
            payload: res.data
        })
    )
    .catch(err => errorHandler(err,dispatch))
}

//EDIT Review
export const editOldReview = (id,value) => async dispatch => {
    authenticateToken()
    await axios.patch(`/api/ratings/${id}`, value)
    .then(res => 
        dispatch({
            type: 'EDIT_REVIEW_',
            payload: res.data
        })
    )
    .then(res => 
        dispatch({
            type: 'SUBMIT_EDIT_REVIEW'
        })
    )
    .then(res=> dispatch(newError("Your Review is Updated", "success")))
    .catch(err => errorHandler(err,dispatch))
}

//DELETE Review
export const deleteReview = (id) => async dispatch => {
    authenticateToken()
    await axios.delete(`/api/ratings/${id}`)
    .then(res => 
        dispatch({
            type: 'DELETE_REVIEW',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Your Review is Deleted", "success")))
    .catch(err => errorHandler(err,dispatch))
}

//DELETE Review by House Owner 
export const deleteReviewByHO = (id) => async dispatch => {
    authenticateToken()
    await axios.delete(`/api/ratings/ho/${id}`)
    .then(res => 
        dispatch({
            type: 'DELETE_REVIEW',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("This Review is Deleted", "success")))
    .catch(err => errorHandler(err,dispatch))
}