import React,  { useState } from 'react'
import '../assets/css/FlipCard.css'

const Users = (props) => {
    const [toggle, setToggle] = useState(false);

    return(
        <div className={toggle ? "card-container" : "card-container card-flip"} onClick={() => setToggle(!toggle)}>
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

export default Users