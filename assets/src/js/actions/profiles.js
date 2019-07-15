import axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { tokenConfig } from './auth'

import { GET_PROFILES, DELETE_PROFILE, ADD_PROFILE } from './types'

const api_url = 'http://127.0.0.1:8000'
// const api_url = 'https://portfolio-shibazaki.herokuapp.com'


// GET LEADS
export const getProfiles = () => (dispatch, getState) => {
  axios.get(`${api_url}/api/profiles/`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// DELETE LEADS
export const deleteProfile = (id) => (dispatch, getState) => {
  axios.delete(`${api_url}/api/profiles/${id}/`, tokenConfig(getState))
    .then( () => {
        dispatch(createMessage({ deleteProfile: "削除しました" }))
        dispatch({
            type: DELETE_PROFILE,
            payload: id
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// ADD LEADS
export const addProfile = (profile) => (dispatch, getState) => {
  axios.post(`${api_url}/api/profiles/`, profile, tokenConfig(getState))
    .then(res => {
        dispatch(createMessage({ addProfile: "追加しました" }))
        dispatch({
            type: ADD_PROFILE,
            payload: res.data
        })
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}