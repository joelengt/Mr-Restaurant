import React from 'react'
import OrderItem from '../order-item'
import stylesheet from './style.scss'
import request from 'request-promise'
import Promise from 'bluebird'
import {requestHTTP} from '../../utils'

class OrderList extends React.Component {
  constructor(props) {
    super(props)

    this.URI = 'http://localhost:3000'

    // This binding is necessary to make `this` work in the callback
    this.setListFood = this.setListFood.bind(this)
    this.getListFood = this.getListFood.bind(this)

    this.state = { listOrders: [] }

  }

  setListFood(array) {
    // event add or remove
    this.props.setListFood(array)
  }

  getListFood() {
    return this.props.getListFood()
  }

  componentDidMount () {
    var options = {
      uri: `${this.URI}/api/orders`,
      json: true
    };

    request(options)
    .then((result) => {
      console.log('Result API>>', result)

      this.setState(prevState => ({
        listOrders: result.data.items
      }))

    })
    .catch((err) => {
        console.log('Error API', err)
    });
  }

  getData(data) {
    let response = data.map((element) => {
      if (this.props.userType === 'admin') {
        return <OrderItem id={element._id} key={element._id} client={element.client} summary={element.summary} food={element.foods} userType={this.props.userType}/>
      } else {
        if (element.isEnabled) {
          return <OrderItem id={element._id} key={element._id} client={element.client} summary={element.summary} food={element.foods} userType={this.props.userType}/>
        }
      }
    })

    return response
  }

  render() {
    let elements = this.state.listOrders

    if (!elements.length) {
      return (<div>Cargando...</div>)
    } else {
      return (
        <div className="OrderList">
          <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
          { this.getData(elements) }
        </div>
      )
    }
  }
}

export default OrderList
