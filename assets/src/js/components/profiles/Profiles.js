import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfiles, deleteProrile } from '../../actions/profiles'

export class Profiles extends Component {

  static propTypes = {
    profiles: PropTypes.array.isRequired,
  }

  componentDidMount () {
    this.props.getProfiles()
  }

  render() {
    return (
      <div className='m-auto' style={{width: "46rem"}}>
        {/* <h3 className='mt-3'>Lists</h3> */}
          <table className='table table-sm table-hover mt-5 ml-auto mr-auto'>
          <thead>
            <tr className='text-muted'>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Message</th>
              <th>
              <div style={{border: '1px solid rgb(5,5,5)', borderRadius: '5px 5px 5px 5px', width: '60px', textAlign: 'center'}}>
              {/* <Link to='/edit' id='link' style={{fontWeight: 70}}> */}
                Edit
              {/* </Link> */}
              </div>
              </th>
            </tr>
          </thead>
          <tbody>
            { this.props.profiles.map( profile => (
              <tr key={profile.id}>
                {/* <td>{list.id}</td> */}
                <td>{profile.name}</td>
                <td>{profile.email}</td>
                <td>{(profile.gender==='M') ? '男' : (profile.gender==='-' ? '-' : '女') }</td>
                <td>{profile.message}</td>
                <td>
                  <button 
                    onClick={this.props.deleteProrile.bind(this, profile.id)} 
                    className='btn btn-outline-danger btn-sm'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    )
  }
}

const mapStateToProps = state => ({
  profiles: state.profiles.profiles
})

export default connect(mapStateToProps, { getProfiles, deleteProrile })(Profiles)
