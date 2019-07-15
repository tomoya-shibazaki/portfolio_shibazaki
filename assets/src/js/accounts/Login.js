import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../actions/auth'
import { Redirect } from 'react-router-dom'


export class Login extends Component {

    state = {
        username: '',
        password: '',
    }

    static propTypes = {
      login: PropTypes.func.isRequired,
      isAuthenticated: PropTypes.bool,
      error: PropTypes.object.isRequired
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }
    
    onChange = e => this.setState({ [e.target.name]: e.target.value })

    render() {

        if (this.props.isAuthenticated) {
          return <Redirect to='/' />
        }

        const { username, password } = this.state

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
                <div className='text-center'>
                <button type="submit" className="btn btn-outline-dark mt-5 btn-block">
                  Login
                </button>
                </div>
                <p className="text-muted mt-3" style={{fontSize: '14px'}}><Link to="/register">新規登録</Link>はこちらから</p>
              </div>
            </form>
          </div>
        )
    }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors,
})

export default connect(mapStateToProps,  { login })(Login)
