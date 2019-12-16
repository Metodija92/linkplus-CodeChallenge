import React from 'react'
import axios from 'axios'
import '../assets/css/Home.css'

import Users from "./Users"

class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            guests: []
        }
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>{
            console.log(res.data)
            for (let i = 0; i < res.data.length; i++) {
                this.setState({guests: [...this.state.guests, <Users key={i} name={res.data[i].name} job={res.data[i].company.catchPhrase}/>]})  
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    render(){
        return(
            <div id='guest-card'>
                {this.state.guests}
            </div>
        )
    }
}

export default Home