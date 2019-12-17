import React from 'react'
import axios from 'axios'
import '../assets/css/Guests.css'

import GuestCard from "./GuestCards"
import BlackList from './BlackList'

class Guests extends React.Component {
    constructor() {
        super()
        this.state = {
            guests: [],
            blackList: [],
            firstNames: [],
            lastNames: [],
            jobs: []
        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getRandomName = () => {
        let num1 = this.getRandomInt(this.state.firstNames.length)
        let num2 = this.getRandomInt(this.state.lastNames.length)
        let name = `${this.state.firstNames[num1]} ${this.state.lastNames[num2]}`
        return name
    }

    getRandomJob = () => {
        let num1 = this.getRandomInt(this.state.jobs.length)
        let num2 = this.getRandomInt(this.state.jobs.length)
        let num3 = this.getRandomInt(this.state.jobs.length)
        let job = `${this.state.jobs[this.getRandomInt(num1)]} ${this.state.jobs[this.getRandomInt(num2)].toLowerCase()} ${this.state.jobs[this.getRandomInt(num3)].toLowerCase()}`
        job = job.charAt(0).toUpperCase() + job.slice(1)
        return job
    }

    generateGuests = () => {
        if(this.state.guests.length <= 10) {
            let guests = []
            for (let i = 0; i < 90; i++) {
                let name = this.getRandomName()
                let job = this.getRandomJob()
                guests.push(<GuestCard key={i+10}  name={name}  job={job}/>)
                
            }
            this.setState({
                guests: [...this.state.guests.concat(guests) ]
            })
        }
    }

    getCheckBoxValue = (event) => {
        console.log(event.target.checked)
        console.log(event.target.name)
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>{
            let nameList = []
            let jobList = []
            for (let i = 0; i < res.data.length; i++) {
                nameList.push(res.data[i].name.split(' '))
                jobList.push(res.data[i].company.catchPhrase.split(' '))
                this.setState({guests: [...this.state.guests, <GuestCard key={i} name={res.data[i].name} job={res.data[i].company.catchPhrase}/>]})              
            }
            this.setState({jobs: jobList.flat()}) 
            return nameList
        })
        .then((nameList) => {
            for (let i = 0; i < nameList.length; i++) {
                if(nameList[i][0] === "Mrs." || nameList[i][0] === "Mr." || nameList[i][0] === "Ms." || nameList[i][0] === "Miss") {
                    this.setState({
                        blackList: [...this.state.blackList, <BlackList key={i} name={nameList[i][1]} getCheckBoxValue={this.getCheckBoxValue}/>/*nameList[i][0]*/],
                        firstNames: [...this.state.firstNames, nameList[i][1]]
                    })
                }
                else {
                    this.setState({
                        blackList: [...this.state.blackList, <BlackList key={i} name={nameList[i][0]} getCheckBoxValue={this.getCheckBoxValue}/>/*nameList[i][0]*/],
                        firstNames: [...this.state.firstNames, nameList[i][0]]
                    })
                }
                for (let j = 1; j < nameList[i].length; j++) {
                    if(nameList[i][0] === "Mrs." || nameList[i][0] === "Mr." || nameList[i][0] === "Ms." || nameList[i][0] === "Miss") {
                        if(nameList[i][j].length > 1 && nameList[i][j+1] != undefined){
                            this.setState({
                                lastNames: [...this.state.lastNames, nameList[i][j+1]]
                            })
                        }
                    } else {
                        if(nameList[i][j].length > 1){
                            this.setState({
                                lastNames: [...this.state.lastNames, nameList[i][j]]
                            })
                        }
                    }
                } 
            }
            console.log(this.state.firstNames)
            console.log(this.state.lastNames)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    render(){
        return(
            <React.Fragment>
                <div id='forbidden-names'>
                    <h3>Forbidden Names</h3>
                    {this.state.blackList}
                    <button onClick={this.generateGuests}>Generate Guests</button>
                </div>
                
                <div id='guest-card'>
                    {this.state.guests}
                </div>
            </React.Fragment>
        )
    }
}

export default Guests