import { newError } from './../actions/error';

export default function errorHandler(err,dispatch){
    if(err.response) {
        dispatch(newError(err.response.data,'danger'))
     console.log(err.response.data)
    } else {
        console.log(err)
    }
}