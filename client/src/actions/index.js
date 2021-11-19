import axios from 'axios'
import history from './../history.js'
import { newError } from './error';

function authenticateToken(){
    if(localStorage.hrms) axios.defaults.headers.common['x-auth-token'] = localStorage.hrms
    else delete axios.defaults.headers.common['x-auth-token'];
} 

function errorHandler(err,dispatch){
    if(err.response) {
        dispatch(newError(err.response.data,'danger'))
     console.log(err.response.data)
    } else {
        console.log(err)
    }
}

export const signUpForm = (value) => async dispatch => {
    console.log("Value ::: ",value)
    await axios.post('/api/users/signup', value)
    .then(res => 
        dispatch({
            type: 'SIGN_UP',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Sign Up Complete", "success")))
    .then(res=> history.push('/login'))
    .catch(err => errorHandler(err,dispatch))
}

export const loginForm = (value) => async dispatch => {
    await axios.post('/api/users/login', value)
    .then(res => 
        dispatch({
            type: 'LOGIN',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Login Success", "success")))
    .then(res=> history.push('/'))
    .catch(err => errorHandler(err,dispatch))
}

export const getUserProfile = () => async dispatch => {
    authenticateToken()

    await axios.get('/api/users/me')
    .then(res => 
        dispatch({
            type: 'GETPROFILE',
            payload: res.data
        })
    )
    .catch(err => errorHandler(err,dispatch))
}

export const logout = () => async dispatch => {
     authenticateToken()
    
    await axios.post('/api/users/logout')
    .then(res => 
        dispatch({
            type: 'LOGOUT'
        })
    )
    .then(res=> dispatch(newError("Logout From This Device", "success")))
    .catch(err => console.log(err))
}

export const logoutAll = () => async dispatch => {
     authenticateToken()
    
    await axios.post('/api/users/logoutAll')
    .then(res => 
        dispatch({
            type: 'LOGOUT'
        })
    )
    .then(res=> dispatch(newError("Logout From All Device", "success")))
    .catch(err => console.log(err))
}

export const EditProfileForm = (value) => async dispatch => {
    authenticateToken()

    await axios.patch('/api/users/edit', value)
    .then(res => 
        dispatch({
            type: 'EDIT_PROFILE',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Profile Updated", "success")))
    .then(res=> history.push('/profile'))
    .catch(err => errorHandler(err,dispatch))
}

export const deleteProfileForm = () => async dispatch => {
    authenticateToken()

    await axios.delete('/api/users/remove')
    .then(res => 
        dispatch({
            type: 'DELETE_PROFILE',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Profile Deleted", "success")))
    .then(res=> history.push('/'))
    .catch(err => errorHandler(err,dispatch))
}

export const uploadProfileImage = (value) => async dispatch => {
    authenticateToken()
    await axios.post('/api/users/me/upload',value)
    .then(res => 
        dispatch({
            type: 'PROFILE_IMAGE_UPDATE',
            payload: res.data
        })
    )
    .then(res=> dispatch({type:'NEED_LOAD'}))
    .then(res=>history.push('/profile'))
    .then(res=> dispatch(newError("Your Image Uploded", "success")))
    .catch(err => dispatch(newError("Only Image can uploaded", "danger")))
}

export const profileImageUrl = (value) => dispatch => {
        dispatch({
            type: 'GET_USER_PROFILE_IMAGE',
            payload: value
        })
}



export const getProfileUrl = (id) => async dispatch => {
    await axios.get(`/api/users/${id}/avatar`)
    .then(res => 
        dispatch({
            type: 'GET_USER_PROFILE_IMAGE',
            payload: res.request.responseURL
        })
    )
    .catch(err => dispatch(newError("Only Image can uploaded 22", "danger")))
}