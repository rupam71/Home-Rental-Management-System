import React from 'react';

const Input = (props) => {
    let inputWidth= 'col-md-6';
    if(props.width) inputWidth='col-md-12';
    return (
        <div className={`form-group ${inputWidth}`}>
            <label>{props.label}</label>
            <input
                type={props.type}
                className="form-control"
                placeholder={`Enter Your ${props.label}`}
                required
                onChange={ e => props.change(e.target.value)}
                value={props.value}
            />
        </div>

    );
}

export default Input;