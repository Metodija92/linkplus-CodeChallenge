import React from 'react'
import axios from 'axios'
import '../assets/css/Guests.css'

import GuestCard from "./GuestCards"
import BlackList from './BlackList'

class Guests extends React.Component {
    constructor() {
        super()
        this.state = {
            guestsList: [],
            guestsCards: [],
            blackList: [],
            nameGenerators: [],
            jobs: [],
            didUpdate: false
        }
    }

    getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getRandomName = () => {
        let num1 = this.getRandomInt(this.state.nameGenerators.length)
        let num2 = this.getRandomInt(this.state.nameGenerators.length)
        let name = `${this.state.nameGenerators[num1]} ${this.state.nameGenerators[num2]}`
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
        let newList = [...this.state.guestsList]
        if(this.state.guestsCards.length <= 10) {
            for (let i = 0; i < 90; i++) {
                let name = this.getRandomName()
                let job = this.getRandomJob()
                newList.push({name: name, job: job, originalGuest: false})
            }
            newList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            this.setState({
                guestsList: newList,
                didUpdate: true
            })
        }
    }
        
    getForbiddenNames = (event) => {
        if(event.target.checked){
            let index = this.state.nameGenerators.indexOf(event.target.name)
            this.setState({
                nameGenerators: this.state.nameGenerators.filter((_, i) => i !== index)
            })
        } else if(!event.target.checked){
            this.setState({
                nameGenerators: [...this.state.nameGenerators, event.target.name]
            })
        }
    }

    getDeleteIndex = (i) => {
        let index = this.state.guestsCards.findIndex(x => x.props.name === i)
        console.log(index)
        console.log(this.state.guestsCards)
        this.setState({
            guestsCards: this.state.guestsCards.filter((_, i) => i !== index)
        })
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>{
            let nameList = []
            let jobList = []
            for (let i = 0; i < res.data.length; i++) {
                nameList.push(res.data[i].name.split(' '))
                jobList.push(res.data[i].company.catchPhrase.split(' '))
                this.setState({guestsList: [...this.state.guestsList, {name: res.data[i].name, job: res.data[i].company.catchPhrase, originalGuest: true}]})
                this.setState({guestsCards: [...this.state.guestsCards, <GuestCard key={i} name={res.data[i].name} job={res.data[i].company.catchPhrase}/>]})              
            }
            this.setState({jobs: jobList.flat()}) 
            return nameList
        })
        .then((nameList) => {
            for (let i = 0; i < nameList.length; i++) {
                if(nameList[i][0] === "Mrs." || nameList[i][0] === "Mr." || nameList[i][0] === "Ms." || nameList[i][0] === "Miss") {
                    this.setState({
                        blackList: [...this.state.blackList, <BlackList key={i} name={nameList[i][1]} getForbiddenNames={this.getForbiddenNames}/>]
                    })
                }
                else {
                    this.setState({
                        blackList: [...this.state.blackList, <BlackList key={i} name={nameList[i][0]} getForbiddenNames={this.getForbiddenNames}/>]
                    })
                }
                for (let j = 0; j < nameList[i].length; j++) {
                    if(nameList[i][0] === "Mrs." || nameList[i][0] === "Mr." || nameList[i][0] === "Ms." || nameList[i][0] === "Miss") {
                        if(nameList[i][j].length > 1 && nameList[i][j+1] != undefined){
                            this.setState({
                                nameGenerators: [...this.state.nameGenerators, nameList[i][j+1]]
                            })
                        }
                    } 
                    else {
                        if(nameList[i][j].length > 1){
                            this.setState({
                                nameGenerators: [...this.state.nameGenerators, nameList[i][j]]
                            })
                        }
                    }
                } 
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    componentDidUpdate(){
        if(this.state.didUpdate) {
            let newCards = []
            for (let j = 0; j < this.state.guestsList.length; j++) {
                if(this.state.guestsList[j].originalGuest){
                    newCards.push(<GuestCard key={j} newCard={true} name={this.state.guestsList[j].name} job={this.state.guestsList[j].job} class={"large"} getDeleteIndex={this.getDeleteIndex}/>)
                } 
                else {
                    newCards.push(<GuestCard key={j} newCard={true} name={this.state.guestsList[j].name} job={this.state.guestsList[j].job} getDeleteIndex={this.getDeleteIndex}/>)
                }
            }
            this.setState({
                guestsCards: newCards,
                didUpdate: false
            })
        }
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
                    {this.state.guestsCards}
                </div>
            </React.Fragment>
        )
    }
}

export default Guests