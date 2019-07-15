import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Alert } from 'react-bootstrap';


export class Alertvar extends Component {

  state = { show: true }

  static propTypes = {
    error: PropTypes.object.isRequired
  }

  componentDidUpdate (prevProps) {
    const { error, message } = this.props
    if (error !== prevProps.error) {
      if (error.msg.name) console.log(`Name: ${error.msg.name}`)
      if (error.msg.email) console.log(`Email: ${error.msg.email}`)
      if (error.msg.message) console.log(`Message: ${error.msg.message}`)

      if (error.msg.non_field_errors) console.log(error.msg.non_field_errors.join())
    }

    if(message !== prevProps.message) {
      if (message.deleteProfile) console.log(message.deleteProfile)
      if (message.addProfile) console.log(message.addProfile)
      if (message.passwordNotMatch) console.log(message.passwordNotMatch)
      if (message.successLogin) console.log(message.successLogin)
      if (message.successRegister) console.log(message.successRegister)
    }

  }


  render() {
    const handleDismiss = () => {
      this.setState({ show: false })
      window.location.reload()
    }
    if (this.state.show) {
      return (
        <div className='mt-0'>
            {this.props.message.deleteProfile ? <Alert variant="success" onClose={handleDismiss} dismissible>{this.props.message.deleteProfile}</Alert> : ''}
            {this.props.message.addProfile ? <Alert variant="success" onClose={handleDismiss} dismissible>{this.props.message.addProfile}</Alert> : ''}
            {this.props.message.successLogin ? <Alert variant="success" onClose={handleDismiss} dismissible>{this.props.message.successLogin}</Alert> : ''}
            {this.props.message.successRegister ? <Alert variant="success" onClose={handleDismiss} dismissible>{this.props.message.successRegister}</Alert> : ''}
            {this.props.message.passwordNotMatch ? <Alert variant="danger" onClose={handleDismiss} dismissible>{this.props.error.message.passwordNotMatch}</Alert> : ''}

            {this.props.error.msg.non_field_errors ? <Alert variant="danger" onClose={handleDismiss} dismissible>{this.props.error.msg.non_field_errors}</Alert> : ''}
        </div>
      )
    } else {
      return (
        <div className='mt-0'>
            
        </div>
      )
    }
    }
  
}


const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
})

export default connect(mapStateToProps)(Alertvar)
