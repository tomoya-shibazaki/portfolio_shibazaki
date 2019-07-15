import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { addProfile } from '../../actions/profiles'

export class Form extends Component {

  state = {
    name: '',
    email: '',
    gender: '-',
    message: '',
  }

  static propTypes = {
    addProfile: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

  componentDidUpdate (prevProps) {
    const { error, message } = this.props
    if (error !== prevProps.error) {
      if (error.msg.name) console.log(`Name: ${error.msg.name}`)
      if (error.msg.email) console.log(`Email: ${error.msg.email}`)
      if (error.msg.gender) console.log(`Gender: ${error.msg.gemder}`)
      if (error.msg.message) console.log(`Message: ${error.msg.message}`)
    }

    if(message !== prevProps.message) {
      if (message.deleteProfile) console.log(message.deleteProfile)
      // if (message.addList) console.log(message.addProfile)
    }
  }


  onChange = e => this.setState({ [e.target.name]: e.target.value })

  onSubmit = e => {
    e.preventDefault()
    // console.log(this.state)
    const { name, email, gender, message } = this.state
    const profile = { name, email, gender, message }
    // console.log(profile)
    this.props.addProfile(profile)
    this.setState({ 
      name: '',
      email: '',
      gender: '-',
      message: ''
    })
  }


  
  render() {

    const { name, email, gender, message } = this.state

    return (
      <div className="card border-light card-body mt-5 mb-2 ml-auto mr-auto" style={{width: "46rem"}}>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label className="mb-2 text-muted">Name</label>
            <input
              className={`form-control form-control-sm ${this.props.error.msg.name ? 'is-invalid' : ''}`}
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
            {this.props.error.msg.name ? <p style={{color: 'red'}}>{this.props.error.msg.name}</p> : ''}
          </div>
          <div className="form-group">
            <label className="mb-2 text-muted">Email</label>
            <input
              className={`form-control form-control-sm ${this.props.error.msg.email ? 'is-invalid' : ''}`}
              type="email"
              name="email"
              onChange={this.onChange}
              value={email}
            />
            {this.props.error.msg.email ? <p style={{color: 'red'}}>{this.props.error.msg.email}</p> : ''}
          </div>
          <div className="form-group">
          <label className="mb-2 text-muted">Gender&nbsp;&nbsp;</label>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" value={gender} onChange={() => this.setState({gender: 'M'})} />
              <label className="form-check-label" htmlFor="radio1a">男</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="gender" value={gender} onChange={() => this.setState({gender: 'F'})}/>
              <label className="form-check-label" htmlFor="radio1b">女</label>
            </div>
          </div>
          
          <div className="form-group">
            <label className="mb-2 text-muted">Message</label>
            <textarea
              className="form-control form-control-sm"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>
          <div className="form-group">
           <div className='btn-group' >
            {/* <Link to='/'> */}
             <button className="btn btn-outline-primary mr-5 ml-0" style={{width: "20rem"}}>
               戻る
             </button>
            {/* </Link> */}
            </div>   
            <div className='btn-group'>
             <button type="submit" className="btn btn-outline-primary" style={{width: "20rem"}}>
               追加
              </button>
            </div>
           </div>   
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  error: state.errors,
  message: state.messages
})


export default connect(mapStateToProps, { addProfile })(Form)
