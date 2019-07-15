import React, { Fragment } from 'react'
import Header from './layout/Header'
import Dashboard from './profiles/Dashboard'
import Edit from './profiles/Edit'

import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Login from '../accounts/Login'
import Register from '../accounts/Register'
import PrivateRoute from './common/PrivateRoute'

import { Provider } from 'react-redux'
import store from '../store'
import { loadUser } from '../actions/auth'


class App extends React.Component {

 componentDidMount () {
   store.dispatch(loadUser())
 }

  render () {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Header />
            <div className='container'>
              <Switch>
                <PrivateRoute exact path='/' component={Dashboard} />
                <PrivateRoute exact path='/edit' component={Edit} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    )
  }
}
export default App
