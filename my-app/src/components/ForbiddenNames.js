import React from 'react'
import axios from 'axios'

import store from '../redux/store'
import { connect } from 'react-redux'
import {editGuestsList, didUpdate} from '../redux/actions/guestsActions'

import BlackList from './BlackList'

class ForbiddenNames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blacklist: [],
            jobs: [],
            nameGenerators: []
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
    
    generateGuests = () => {
        let newList = [...this.props.guestsList]
        if(newList.length <= 10) {
            for (let i = 0; i < 90; i++) {
                let name = this.getRandomName()
                let job = this.getRandomJob()
                newList.push({name: name, job: job, originalGuest: false})
            }
            newList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            store.dispatch(editGuestsList(newList))
            store.dispatch(didUpdate(true))
        }
    }
    
    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>{
            let nameList = []
            let jobList = []
            let guestsList = []
            for (let i = 0; i < res.data.length; i++) {
                nameList.push(res.data[i].name.split(' '))
                jobList.push(res.data[i].company.catchPhrase.split(' '))
                guestsList.push({name: res.data[i].name, job: res.data[i].company.catchPhrase, originalGuest: true})            
            }
            store.dispatch(editGuestsList(guestsList))
            this.setState({jobs: jobList.flat()}) 
            return nameList
        })
        .then((nameList) => {
            let blackListNames =[]
            for (let i = 0; i < nameList.length; i++) {
                if(nameList[i][0] === "Mrs." || nameList[i][0] === "Mr." || nameList[i][0] === "Ms." || nameList[i][0] === "Miss") {
                    blackListNames.push(<BlackList key={i} name={nameList[i][1]} getForbiddenNames={this.getForbiddenNames}/>)
                }
                else {
                    blackListNames.push(<BlackList key={i} name={nameList[i][0]} getForbiddenNames={this.getForbiddenNames}/>)
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
            this.setState({blackList: blackListNames})
        })
        .catch(err=>{
            console.log(err)
        })
    }

    render () {
        return(
            <div id='forbidden-names'>
                <h3>Forbidden Names</h3>
                {this.state.blackList}
                <button onClick={this.generateGuests}>Generate Guests</button>
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        guestsList: state.guestsReducer.guestsList,
        didUpdate: state.guestsReducer.didUpdate
    }
}

export default connect(mapStateToProps)(ForbiddenNames)