import { combineReducers } from 'redux'
import profiles from './profiles'
import errors from './errors'
import messages from './messages'
import auth from './auth'

export default combineReducers({
  profiles,
  errors,
  messages,
  auth
})