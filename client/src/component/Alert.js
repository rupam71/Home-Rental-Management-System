import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
    const errors = useSelector(state=>state.error)
    console.log(errors)

    if(errors !== null && errors.length > 0) return errors.map(error=>( 
        <div key={error.id} className={`alert alert-${error.alertType} container mt-2`}>
            {error.message}
        </div>
     ))
    else return(<div></div>)
}
 
export default Alert;