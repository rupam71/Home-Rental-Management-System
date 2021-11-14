import React from 'react';

const Dropdown = ({name,option,change}) => {
    return ( 
        <div className="form-group col-md-6">
            <label>{name} <i class="fas fa-caret-down"/></label> 
            <br/>
            <select
            onChange ={(e)=>change(e.target.value)}>
                <option value="">{name} </option>
                {option.map(op=><option value={op}>{op}</option> )}
            </select>
        </div> 
     );
}
 
export default Dropdown;