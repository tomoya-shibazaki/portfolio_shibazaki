import axios from 'axios'
import { returnErrors, createMessage } from './messages'


import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types'

// let url = 'http://127.0.0.1:8000'
let url = 'https://portfolio-shibazaki.herokuapp.com'

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    
    // User loading
    dispatch({ type: USER_LOADING })

    axios.get(`${url}/api/auth/user`, tokenConfig(getState))
      .then(res => {
          dispatch({
              type: USER_LOADED,
              payload: res.data
          })
      }).catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status))
          dispatch({
              type: AUTH_ERROR
          })
      })
}


// LOGIN USER
export const login = (username, password) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Reauest Body
    const body = JSON.stringify({ username, password})

    axios.post(`${url}/api/auth/login`, body, config)
      .then(res => {
          dispatch(createMessage({ successLogin : "ログインしました" }))
          dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data
          })
      }).catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status))
          dispatch({
              type: LOGIN_FAIL
          })
      })
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {


    axios.post(`${url}/api/auth/logout`, null, tokenConfig(getState))
      .then(res => {
          dispatch({
              type: LOGOUT_SUCCESS
          })
      }).catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status))
      })
 }



// REGISTER USER
export const register = ({ username, email, password }) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Reauest Body
    const body = JSON.stringify({ username, email, password})

    axios.post(`${url}/api/auth/register`, body, config)
      .then(res => {
          dispatch(createMessage({ successRegister : "新規登録しました" }))
          dispatch({
              type: REGISTER_SUCCESS,
              payload: res.data
          })
      }).catch(err => {
          dispatch(returnErrors(err.response.data, err.response.status))
          dispatch({
              type: REGISTER_FAIL
          })
      })
}

// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // If token, add to headers config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}