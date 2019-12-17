import React from 'react'
import '../assets/css/DeleteAlert.css'

const DeleteAlert = (props) => {

    return (
        <React.Fragment>
            <div className="alert">
                <div className="alert-container">
                    <div className="alert-text-container">
                        <h1>Delete Card</h1>
                        <p>Are you sure you want to delete guests card ?</p>
                    </div>
                    <div className="alert-buttons">
                        <button className="alert-btn cancel-alert-btn" onClick={props.hideAlert}>CANCEL</button>
                        <button className="alert-btn delete-alert-btn" onClick={props.del}>DELETE</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default DeleteAlert