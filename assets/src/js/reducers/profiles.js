import { GET_PROFILES, DELETE_PROFILE, ADD_PROFILE } from '../actions/types.js'

const initialState = {
  profiles: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload
      }
    case DELETE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter(profile => profile.id !== action.payload)
      }
    case ADD_PROFILE:
      return {
        ...state,
        profiles: [...state.profiles, action.payload]
      }
    default:
      return state
  }
}