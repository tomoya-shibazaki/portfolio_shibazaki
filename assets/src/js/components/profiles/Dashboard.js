import React, { Fragment } from 'react'

import Form from './Form'
import Profiles from './Profiles'

export default function Dashboard() {
  return (
    <Fragment>
      <Profiles />
      <Form />
    </Fragment>
  )
}
