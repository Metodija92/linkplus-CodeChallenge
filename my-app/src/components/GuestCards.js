import React,  { useState } from 'react'
import '../assets/css/FlipCard.css'
import DeleteAlert from './DeleteAlert'

const GuestCards = (props) => {
    const [flip, setFlip] = useState(false);

    // function del(){
    //     setAlert(!alert)
    //     props.getDeleteIndex(props.name)
    // }

    

    return(
        <React.Fragment>
            
            <div className={flip ? `card-container ${props.class}`  : `card-container ${props.class} card-flip`} onClick={() => setFlip(!flip)}>
                {props.newCard ? 
                    <button className="edit-del-btn far fa-trash-alt" id='del-btn' onClick={() => props.getDeleteIndex(props.name)}> </button>
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