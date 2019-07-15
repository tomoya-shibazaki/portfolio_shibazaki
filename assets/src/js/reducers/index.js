import { combineReducers } from 'redux'
import profiles from './profiles'
import errors from './errors'
import messages from './messages'

export default combineReducers({
  profiles,
  errors,
  messages,
})