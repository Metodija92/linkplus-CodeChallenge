import React from 'react'
import axios from 'axios'

import Guests from "./Guests"

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
        }
    }
    
    render(){
        return(
            <React.Fragment>
                <Guests />
            </React.Fragment>
        )
    }
}

export default Home