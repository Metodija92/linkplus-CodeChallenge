import React, { useState, useEffect } from 'react'

const BlackList = (props) => {

    return(
        <span>
            <input type='checkbox' name={props.name} onClick={props.getCheckBoxValue}/>
            <label htmlFor={props.name}>{props.name}</label>
        </span>
    )
}

export default BlackList