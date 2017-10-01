import React from 'react'
import stylesheet from './style.scss'
import OrdersList from '../orders-list'
import request from 'request-promise'
import {requestHTTP} from '../../utils'
import NavOptions from './nav-options'

let data = [
  {
    id: '0',
    name: 'Orders'
  },
  {
    id: '1',
    name: 'Menu Food'
  },
  {
    id: '2',
    name: 'Admin Team'
  }
]

class Admin extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    // this.handleNextButton = this.handleNextButton.bind(this)
    this.foodList = []
    this.state = { nextButton: false }
  }

  render() {
    return (
      <div className="Admin">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Admin__list">
          <div className="Admin__list-container">
            <NavOptions options={data} />
          </div>
        </div>
      </div>
    )
  }
}

export default Admin
