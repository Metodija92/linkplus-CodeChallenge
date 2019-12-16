import ReactDOM from 'react-dom'
import React from 'react'

import Home from './components/Home'

const app = document.getElementById('app')

const App = () => {
    return(
        <React.Fragment>
            <Home />
        </React.Fragment>
    )
}

ReactDOM.render(<App />, app)