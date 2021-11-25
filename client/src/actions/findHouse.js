import axios from 'axios'
import history from './../history.js'
import { newError } from './error';
import authenticateToken from './../utility/authenticateToken';
import errorHandler from './../utility/errorHandler';

export const houseList = (url) => async dispatch => {
    authenticateToken()
    await axios.get(`/api/houses${url}`)
    .then(res => 
        dispatch({
            type: 'HOUSELIST',
            payload: res.data
        })
    )
    .catch(err=>console.log("Error ::: ",err))
}

export const showHouse = (id) => async dispatch => {
    await axios.get(`/api/house/${id}`)
    .then(res => 
        dispatch({
            type: 'SHOWHOUSE',
            payload: res.data
        })
    )
    .catch(err=>console.log("Error ::: ",err))
}

export const emptyHouse = () => dispatch => {
    dispatch({
        type: 'EMPTYHOUSE'
    })
}

export const userProfile = (id) => async dispatch => {
    await axios.get(`/api/users/${id}`)
    .then(res => 
        dispatch({
            type: 'USER_PROFILE',
            payload: res.data
        })
    )
    .catch(err=>console.log("Error ::: ",err))
}
//CREATE HOUSE
export const createHouseForm = (value) => async dispatch => {
    authenticateToken()
    await axios.post('/api/house', value)
    .then(res=> history.push(`/uploadhouseimage/${res.data._id}`))
    .then(res=> dispatch(newError("Your House Created", "success")))
    .catch(err => errorHandler(err,dispatch))
}

export const houseListById = (id) => async dispatch => {
    await axios.get(`/api/house/ho/${id}`)
    .then(res => 
        dispatch({
            type: 'HOUSELIST',
            payload: res.data
        })
    )
    .catch(err=>console.log("Error ::: ",err))
}

export const editHouseForm = (id,value) => async dispatch => {
    await axios.patch(`/api/house/${id}`, value)
    .then(res => 
        dispatch({
            type: 'HOUSE_EDIT',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Your House Edited Complete", "success")))
    .then(res=> history.push(`/house/${id}`))
    .catch(err => errorHandler(err,dispatch))
}

export const deleteHouse = (id) => async dispatch => {
    await axios.delete(`/api/house/${id}`)
    .then(res => 
        dispatch({
            type: 'HOUSE_DELETE',
            payload: res.data
        })
    )
    .then(res=> dispatch(newError("Your House Deleted", "success")))
    .then(res=> history.push(`/profile`))
    .catch(err => errorHandler(err,dispatch))
}

export const availableHouse = () => dispatch => {
    dispatch({
        type: 'AVAILABLE_HOUSE'
    })
}

    export const uploadHouseImages = (value,id) => async dispatch => {
        authenticateToken()
        await axios.post(`/api/house/${id}/upload`,value)
        // .then(res => 
        //     dispatch({
        //         type: 'PROFILE_IMAGE_UPDATE',
        //         payload: res.data
        //     })
        // )
        // .then(res=> dispatch({type:'NEED_LOAD'}))
        // .then(res=>history.push('/profile'))
        .then(res=> dispatch(newError("Your Image Uploded", "success")))
        .then(res=>history.push(`/house/${id}`))
        .catch(err => dispatch(newError("Only Image can uploaded", "danger")))
    }

export const serchHouse = (query) => dispatch => {
    dispatch({ 
        type:'SEARCH_HOUSE',
        payload:query
     })
}

//CREATE BOOKMARK
export const createBookmark = (houseId) => async dispatch => {
    authenticateToken()
    await axios.post(`/api/house/${houseId}/addbookmark`)
    .then(res =>{
        const {house,user} = res.data
        dispatch({
            type: 'HOUSE_EDIT',
            payload: house
        })
        dispatch({
            type: 'EDIT_PROFILE',
            payload: user
        })
    })
    .then(res=> dispatch(newError("Bookmark Added", "success")))
    .catch(err => errorHandler(err,dispatch))
}

//CREATE BOOKMARK
export const removeBookmark = (houseId) => async dispatch => {
    authenticateToken()
    await axios.post(`/api/house/${houseId}/removebookmark`)
    .then(res =>{
        const {house,user} = res.data
        dispatch({
            type: 'HOUSE_EDIT',
            payload: house
        })
        dispatch({
            type: 'EDIT_PROFILE',
            payload: user
        })
    })
    .then(res=> dispatch(newError("Bookmark Removed", "success")))
    .catch(err => errorHandler(err,dispatch))
}