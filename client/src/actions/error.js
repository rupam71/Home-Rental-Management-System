import {v4 as uuid} from "uuid";
// import { REMOVE_ALERT, SET_ALERT } from './types';

export const newError = (message, alertType, timeout=5000) => dispatch => {
    const id = uuid();
    dispatch({
        type:'NEW_ERROR',
        payload: {
            message,
            alertType,
            id
        }
    })

    setTimeout(()=> dispatch({
        type:'REMOVE_ERROR',
        payload: id
    }),timeout)
}