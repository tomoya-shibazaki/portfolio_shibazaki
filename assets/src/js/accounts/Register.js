import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../actions/auth'
import { createMessage } from '../actions/messages'
import { Redirect } from 'react-router-dom'


export class Register extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

  onSubmit = e => {
    e.preventDefault()
    const { username, email, password, password2 } = this.state
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'パスワードが一致しません'})
    } else {
      const newUser = {
        username,
        password,
        email
      }

      this.props.register(newUser)
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {

    if (this.props.isAuthenticated) {
      return <Redirect to='/' />
    }

    const { username, email, password, password2 } = this.state


    return (

      <div className="card bg-light card-body mt-5 mb-2 ml-auto mr-auto" style={{width: "28rem"}}>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label className="mb-2 text-muted">Username</label>
          <input
            // className='form-control form-control-sm'
            className={`form-control form-control-sm ${this.props.error.msg.username ? 'is-invalid' : ''}`}
            type="text"
            name="username"
            onChange={this.onChange}
            value={username}
          />
          {this.props.error.msg.username ? <p style={{color: 'red'}}>{this.props.error.msg.username}</p> : ''}
        </div>
        <div className="form-group">
          <label className="mb-2 text-muted">Email</label>
          <input
            // className='form-control form-control-sm'
            className={`form-control form-control-sm ${this.props.error.msg.email ? 'is-invalid' : ''}`}
            type="text"
            name="email"
            onChange={this.onChange}
            value={email}
          />
          {this.props.error.msg.email ? <p style={{color: 'red'}}>{this.props.error.msg.email}</p> : ''}
        </div>
        <div className="row">
        <div className="form-group col">
          <label className="mb-2 text-muted">Password</label>
          <input
            // className='form-control form-control-sm'
            className={`form-control form-control-sm ${this.props.error.msg.password ? 'is-invalid' : ''}`}
            type="password"
            name="password"
            onChange={this.onChange}
            value={password}
          />
          {this.props.error.msg.password ? <p style={{color: 'red'}}>{this.props.error.msg.password}</p> : ''}
        </div>
        <div className="form-group col">
          <label className="mb-2 text-muted">Password(Confrom)</label>
          <input
            className='form-control form-control-sm'
            type="password"
            name="password2"
            onChange={this.onChange}
            value={password2}
          />
         </div>
         </div>
         <div className='text-center'>
           <button type="submit" className="btn btn-outline-dark mt-3 btn-block">
            Register
            </button>
         </div>
         <p className="text-muted mt-3" style={{fontSize: '14px'}}><Link to="/login">ログイン</Link>はこちらから</p>
      </form>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors,
  message: state.messages
})

export default connect(mapStateToProps, { register, createMessage })(Register)
