import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import Alertvar from './Alertvar'


class Header extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  render () {

    const { isAuthenticated, user } = this.props.auth
    
    const authLinks = (
      <ul className='navbar-nav ml-auto mr-5'>
        <span className='navbar-text mr-3'>
        <strong>
          { user ? `Welcome ${user.username}`: ""}
        </strong>
        </span>
          <li className='nav-item'>
            <button 
              onClick={this.props.logout}
              className='nav-link btn btn-dark btn-sm text-light'>
              Logout
            </button>
          </li>
      </ul>
    )

    const guestLinks = (
      <ul className='navbar-nav ml-auto mr-5'>
        <li className='nav-item'>
          <Link to='/register' className='nav-link'>Register</Link>
        </li>
        <li className='nav-item'>
          <Link to='/login' className='nav-link'>Login</Link>
        </li>
      </ul>
    )

    return (
      <Fragment>
        <nav className='navbar fixed-top navbar-expand-sm navbar-light bg-light'>
        <Link to='/' className='navbar-brand ml-5'>CRUD</Link>
        <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarTogglerDemo02' aria-controls='navbarTogglerDemo02' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon' />
        </button>
        <div className='collapse navbar-collapse' id='navbarTogglerDemo02'>
          { isAuthenticated ? authLinks : guestLinks }
       </div>
        </nav>

        <Alertvar />
      </Fragment>
    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Header)

