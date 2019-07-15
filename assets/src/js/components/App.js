import React, { Fragment } from 'react'

import Header from './layout/Header'
import Dashboard from './profiles/Dashboard'

import { Provider } from 'react-redux'
import store from '../store'


class App extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Fragment>
          <Header />
          <div className="container">
            <Dashboard />
          </div>
        </Fragment>
      </Provider> 
    )
  }
}

export default App