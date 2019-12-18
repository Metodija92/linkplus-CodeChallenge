import React,  { useState } from 'react'
import '../assets/css/FlipCard.css'

const GuestCards = (props) => {
    const [flip, setFlip] = useState(false);

    return(
        <React.Fragment>
            
            <div className={flip ? `card-container ${props.class}`  : `card-container ${props.class} card-flip`} onClick={() => setFlip(!flip)}>
                {props.newCard ? 
                    <button className="edit-del-btn far fa-trash-alt" id='del-btn' onClick={(event) => props.getDeleteIndex(props.name, event)}> </button>
                : null
                }

                <div className="card-flip">

                    {!flip ?
                    <div className="front">
                        <p>{props.name}</p>
                    </div>
                    : null}

                    {flip ? 
                    <div className="back">
                        <p>{props.job}</p>
                    </div>
                    : null}
                    
                </div>
            </div>
        </React.Fragment>
    )
}

export default GuestCards