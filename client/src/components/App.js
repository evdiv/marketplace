import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'
import Orders from './Orders/Orders'

export default class extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Orders />
        <Footer />
      </Fragment>
    )
  }
} 




