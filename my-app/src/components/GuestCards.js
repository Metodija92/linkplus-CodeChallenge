import React,  { useState } from 'react'
import '../assets/css/FlipCard.css'

const GuestCards = (props) => {
    const [toggle, setToggle] = useState(false);

    return(
        <div className={toggle ? `card-container ${props.class}`  : `card-container ${props.class} card-flip`} onClick={() => setToggle(!toggle)}>
            <div className="card-flip">

                {!toggle ?
                <div className="front">
                    <p>{props.name}</p>
                </div>
                : null}

                {toggle ? 
                <div className="back">
                    <p>{props.job}</p>
                </div>
                : null}
                
            </div>
        </div>
    )
}

export default GuestCards