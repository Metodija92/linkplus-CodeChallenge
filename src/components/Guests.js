import React from 'react'
import axios from 'axios'
import '../assets/css/Guests.css'

import store from '../redux/store'
import { connect } from 'react-redux'
import {didUpdate} from '../redux/actions/guestsActions'

import GuestCard from "./GuestCards"
import DeleteAlert from './DeleteAlert'
import Loading from './Loading'

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
    
    // onClick for the delete btn on the flip cards, gets item for deleting
    getDeleteIndex = (name, event) => {
        this.showOrHideAlert()
        let index = this.state.guestsCards.findIndex(x => x.props.name === name)
        this.setState({deleteIndex: index})
        event.stopPropagation()
    }

    // onClick for Delete Modal, confirm delete
    confirmCardDelete = () => {
        this.showOrHideAlert()
        this.setState({
            guestsCards: this.state.guestsCards.filter((_, i) => i !== this.state.deleteIndex)
        })
    }

    // Activates in componentDidUpdate, searches duplicates after generating new guests
    duplicateSearch = () => {
        let counter = 0
        let result = {}
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

    // onClick for DEDUPLICATE btn, delete duplicate cards
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

    // Triggers after the onClick Generate Guests btn
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
                {this.state.alert ? <DeleteAlert showOrHideAlert={this.showOrHideAlert} confirmCardDelete={this.confirmCardDelete}/> : null}
                <div>
                    <div id='count'>
                        <span> Duplicate count: {this.state.dCounter} </span>
                        {this.state.dCounter > 0 ? <button className='top-side-btn' onClick={this.deduplicate}>DEDUPLICATE</button> : null}
                    </div>
                    {this.state.guestsCards.length < 10 ? <Loading /> : null}
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