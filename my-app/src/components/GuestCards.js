import React,  { useState } from 'react'
import '../assets/css/FlipCard.css'
import DeleteAlert from './DeleteAlert';

const GuestCards = (props) => {
    const [flip, setFlip] = useState(false);
    const [alert, setAlert] = useState(false);

    function del(){
        setAlert(!alert)
        props.getDeleteIndex(props.name)
    }

    function hideAlert(){
        setAlert(!alert)
    }

    return(
        <React.Fragment>
            {alert ? <DeleteAlert del={del} hideAlert={hideAlert}/> : null}
            <div className={flip ? `card-container ${props.class}`  : `card-container ${props.class} card-flip`} onClick={() => setFlip(!flip)}>
                {props.newCard ? 
                    <button className="edit-del-btn far fa-trash-alt" id='del-btn' onClick={() => setAlert(!alert)}> </button>
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