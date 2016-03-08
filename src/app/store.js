import {combineReducers, createStore, applyMiddleware} from 'redux'

// Middleware
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'

// Reducers
import {reducer as auth} from './auth/states'
import {reducer as sessions} from './sessions/states'

export default createStore(
  combineReducers({
    auth,
    sessions
  }),
  applyMiddleware(
    thunk,
    createLogger()
  )
);