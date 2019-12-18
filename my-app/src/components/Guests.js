import React from 'react'
import axios from 'axios'
import '../assets/css/Guests.css'

import store from '../redux/store'
import { connect } from 'react-redux'
import {didUpdate} from '../redux/actions/guestsActions'

import GuestCard from "./GuestCards"
import DeleteAlert from './DeleteAlert'

class Guests extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            guestsCards: [],
            alert: false,
            deleteIndex: null,
            dCounter: 0
        }
    }

    showOrHideAlert = () => {
        this.setState({alert: !this.state.alert})
    }
    
    getDeleteIndex = (i) => {
        this.showOrHideAlert()
        let index = this.state.guestsCards.findIndex(x => x.props.name === i)
        this.setState({deleteIndex: index})
    }

    confirmCardDelete = () => {
        this.showOrHideAlert()
        this.setState({
            guestsCards: this.state.guestsCards.filter((_, i) => i !== this.state.deleteIndex)
        })
    }

    duplicateSearch = () => {
        let counter = 0
        let result = { }
        
        if(this.props.guestsList.length > 10 && this.state.guestsCards.length <= 10){
            let data = [...this.props.guestsList]
            for (let i = 0; i < data.length; i++) {
                result[data[i].name] = (result[data[i].name] || 0) + 1
            }
        }
        if(this.props.guestsList.length > 10 && this.state.guestsCards.length > 10) {
            for (let i = 0; i < this.state.guestsCards.length; i++) {
                result[this.state.guestsCards[i].props.name] = (result[this.state.guestsCards[i].props.name] || 0) + 1
            }
        }

        Object.keys(result).map(key => ({ [key]: result[key] }))
        for (let j in result) {
            if (result[j] > 1) {
                counter++
            }
        }
        console.log(result)
        console.log(counter)
        this.setState({dCounter: counter})
    }

    deduplicate = () => {
        let test = [...this.state.guestsCards]
        test = test.filter((thing, index, self) => (
            index === self.findIndex((t) => (
                t.props.name === thing.props.name
            ))
        ))
        console.log(test)
        this.setState({guestsCards: test})
        setTimeout(() => { this.duplicateSearch(); }, 100);
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res=>{
            for (let i = 0; i < res.data.length; i++) {
                this.setState({guestsCards: [...this.state.guestsCards, <GuestCard key={i} name={res.data[i].name} job={res.data[i].company.catchPhrase}/>]})              
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    componentDidUpdate(){
        if(this.props.didUpdate) {
            let newCards = []
            for (let j = 0; j < this.props.guestsList.length; j++) {
                if(this.props.guestsList[j].originalGuest){
                    newCards.push(<GuestCard key={j} newCard={true} name={this.props.guestsList[j].name} job={this.props.guestsList[j].job} class={"large"} getDeleteIndex={this.getDeleteIndex}/>)
                } 
                else {
                    newCards.push(<GuestCard key={j} newCard={true} name={this.props.guestsList[j].name} job={this.props.guestsList[j].job} getDeleteIndex={this.getDeleteIndex}/>)
                }
            }
            this.setState({
                guestsCards: newCards
            })
            store.dispatch(didUpdate(false))
            this.duplicateSearch()
        }
    }
    
    render(){
        return(
            <React.Fragment>
                {this.state.alert ? <DeleteAlert /*del={del}*/showOrHideAlert={this.showOrHideAlert} confirmCardDelete={this.confirmCardDelete}/> : null}
                <div>
                    <div>
                        <p onClick={this.duplicateSearch}>Duplicate count: {this.state.dCounter}</p>
                        {this.state.dCounter > 0 ? <button onClick={this.deduplicate}>DEDUPLICATE</button> : null}
                    </div>
                    <div id='guest-card'>
                        {this.state.guestsCards}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

function mapStateToProps (state) {
    return {
        guestsList: state.guestsReducer.guestsList,
        didUpdate: state.guestsReducer.didUpdate
    }
}

export default connect(mapStateToProps)(Guests)