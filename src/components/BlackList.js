import React from 'react'

const BlackList = (props) => {

    return(
        <li>
            <input type='checkbox' name={props.name} onClick={props.getForbiddenNames}/>
            <label htmlFor={props.name}>{props.name}</label>
        </li>
    )
}

export default BlackList