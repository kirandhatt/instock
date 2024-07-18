import React from 'react';
import './Dropdown.scss'

function Dropdown({name, placeholder}) {
    return (
  
  
             <form className='form-group'>
            <label htmlFor="dropdown"> {name}</label>
            <input type="text" name="dropdown" id="dropdown" placeholder={placeholder} className='dropdown' />
        </form>
       
    );
}

export default Dropdown;