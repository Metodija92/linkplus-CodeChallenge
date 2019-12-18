import React from 'react'
import axios from 'axios'

import Guests from "./Guests"
import ForbiddenNames from './ForbiddenNames'

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    
    render(){
        return(
            <React.Fragment>
                <ForbiddenNames />
                <Guests />
            </React.Fragment>
        )
    }
}

export default Home