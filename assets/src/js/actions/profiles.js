import axios from 'axios'

import { createMessage, returnErrors } from './messages'
import { GET_PROFILES, DELETE_PRORILE, ADD_PROFILE, GET_ERRORS } from './types'

const api_url = 'http://127.0.0.1:8000'
// const api_url = 'https://portfolio-shibazaki.herokuapp.com'

// GET PROFILES
export const getProfiles = () => dispatch => {
  axios.get(`${api_url}/api/profiles/`)
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
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
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
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
    }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}
