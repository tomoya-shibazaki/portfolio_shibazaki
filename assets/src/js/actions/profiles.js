import axios from 'axios'

import { createMessage } from './messages'
import { GET_PROFILES, DELETE_PRORILE, ADD_PROFILE, GET_ERRORS } from './types'

const api_url = 'http://127.0.0.1:8000'

// GET PROFILES
export const getProfiles = () => dispatch => {
  axios.get(`${api_url}/api/profiles/`)
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    }).catch(err => console.log(err))
}

// DELETE PRORILE
export const deleteProrile = (id) => dispatch => {
  axios.delete(`${api_url}/api/profiles/${id}/`)
    .then(() => {
      dispatch(createMessage({ deleteProfile: "削除しました" }))
      dispatch({
        type: DELETE_PRORILE,
        payload: id
      })
    }).catch(err => console.log(err))
}

// ADD PROFILES
export const addProfile = profile => dispatch => {
  axios.post(`${api_url}/api/profiles/`, profile)
    .then(res => {
      dispatch(createMessage({ addProfile: "追加しました" }))
      dispatch({
        type: ADD_PROFILE,
        payload: res.data
      })
    }).catch(err => {
      const errors = {
        msg: err.response.data,
        status: err.response.status
      }
      dispatch({
        type: GET_ERRORS,
        payload: errors
      })
    })
}
