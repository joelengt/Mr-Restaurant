import React from 'react'
import stylesheet from './style.scss'
import OrdersList from '../orders-list'
import request from 'request-promise'
import {requestHTTP} from '../../utils'

class Chef extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    // this.handleNextButton = this.handleNextButton.bind(this)
    this.setListFood = this.setListFood.bind(this)
    this.getListFood = this.getListFood.bind(this)
    this.foodList = []

    this.state = { nextButton: false }
  }

  setListFood(array) {
    // event add or remove
    this.foodList = array
  }

  getListFood() {
    return this.foodList
  }

  render() {
    return (
      <div className="Chef">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Chef__list">
          <div className="Chef__list-container">
            <h2>Orders</h2>
            <OrdersList userType="chef"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Chef
