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
            deleteIndex: null
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
        }
    }
    
    render(){
        return(
            <React.Fragment>
                {this.state.alert ? <DeleteAlert /*del={del}*/showOrHideAlert={this.showOrHideAlert} confirmCardDelete={this.confirmCardDelete}/> : null}
                <div id='guest-card'>
                    {this.state.guestsCards}
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