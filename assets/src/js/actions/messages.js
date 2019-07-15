import { CREATE_MESSAGES } from './types'

// CERATE MESSAGE
export const createMessage = msg => {
  return {
    type: CREATE_MESSAGES,
    payload: msg
  }
}