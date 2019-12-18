import React from 'react'
import axios from 'axios'

import Guests from "./Guests"
import ForbiddenNames from './ForbiddenNames'
import DeleteAlert from './DeleteAlert'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    
    render(){
        return(
            <React.Fragment>
                {/* <DeleteAlert/> */}
                <ForbiddenNames />
                <Guests />
            </React.Fragment>
        )
    }
}

export default Home