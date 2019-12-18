import ReactDOM from 'react-dom'
import React from 'react'

import Home from './components/Home'

import { Provider } from 'react-redux'
import store from './redux/store'

const app = document.getElementById('app')

const App = () => {
    return(
        <React.Fragment>
            <Home />
        </React.Fragment>
    )
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider> , app)
    