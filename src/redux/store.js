import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { guestsReducer } from './reducers/guestsReducer'

const singleReducer = combineReducers({
    guestsReducer,
})


const store = createStore(
    singleReducer,
    applyMiddleware(logger)
)

console.log(store.getState())

export default store