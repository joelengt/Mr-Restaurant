import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import FootItem from './food-item'
import {requestHTTP} from '../../utils'
import config from '../../config.js'

class OrderItem extends React.Component {
  constructor(props) {
    super(props)
    this.URI = config.url

    this.state = { orderState: this.props.orderState, currentState: this.props.orderState }
    // This binding is necessary to make `this` work in the callback
    this.handleStateClick = this.handleStateClick.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)

    this.userType = this.props.userType

  }

  async handleStateClick() {
    console.log('FINAL DATO to send')
    let OrderID = this.props.id

    try {
      // update order
      let payload = {
        state: this.state.orderState
      }

      let result = await requestHTTP(`${this.URI}/api/orders/${OrderID}?_method=put`, 'post', payload)
      console.log('ORDER CREATION >>', result)

      this.setState({ currentState: this.state.orderState })

    } catch (err) {
      console.log('Error API', err)
    }
  }

  handleChangeState(e) {
    console.log('Element selected')
    console.log(e.target.value)

    if (e.target.name === 'selectState') {
      this.setState({ orderState: e.target.value })

    } else {
      console.log('Error')
    }
  }

  getFoodList(FoodList) {
    console.log('Food list!! > ', FoodList)
    let result = FoodList.map((element) => {
      let food = element.item
      if (food) {
        return <FootItem id={food._id} key={food._id} name={food.name} price={food.price} cant={element.cant} userType={this.props.userType}/>
      }
    })

    return result
  }

  getPricePretty(num) {
    let pretty = (num/100).toFixed(2)
    return `S/${pretty}`
  }

  isAdmin() {
    if (this.userType === 'admin') {
      return (
        <div>
          <b>Summary</b>
          <p>quantity: { this.props.summary.items } </p>
          <p>Sub Total: { this.getPricePretty(this.props.summary.subtotal) }</p>
          <p>IGV (18%): { this.getPricePretty(this.props.summary.igv) }</p>
          <p>Total: { this.getPricePretty(this.props.summary.total) }</p>
        </div>
      )
    }
  }

  isAdminToShowPrice() {
    if (this.userType === 'admin') {
      return (
        <td>
          Price
        </td>
      )
    }
  }

  isChefToUpdateState() {
    if (this.userType === 'chef') {
      return (
        <div>
          <form>
            <select name="selectState" onChange={ this.handleChangeState }>
              <option>
                Pendiente
              </option>
              <option>
                EnProceso
              </option>
              <option>
                Terminado
              </option>
            </select>
            <button onClick={ this.handleStateClick } type="button" className="btn btn-success">Update</button>
          </form>
        </div>
      )
    }
  }

  render() {
    let currentStatusBadge = ''

    if (this.state.orderState === 'Pendiente') {
      currentStatusBadge = <span className="badge badge-primary">{ this.state.orderState }!</span>
    } else if (this.state.orderState === 'EnProceso') {
      currentStatusBadge = <span className="badge badge-warning">{ this.state.orderState }</span>
    } else if (this.state.orderState === 'Terminado') {
      currentStatusBadge = <span className="badge badge-success">{ this.state.orderState }</span>
    } else {
      currentStatusBadge = <span className="badge badge-dark">Error</span>
    }

    return (
      <article className="Cajero__list-item">
        <div className="Cajero__list-item--cover">
          <img src="/static/images/Twemoji_1f35c.png"></img>
        </div>
        <div className="Cajero__list-item--details">
          <h2 className="title">
            NRA000{ this.props.id }
          </h2>
          <div>
            <span className="badge badge-primary">{ this.state.currentState }</span>
          </div>
          <div>
            { this.isChefToUpdateState() }
          </div>
          <div>
            <b>Datos del client</b>
            <p>Client: { this.props.client.fullName }</p>
            <p>DNI: { this.props.client.dni }</p>
          </div>
          <div>
            <b>List Food</b>
            <table className="table">
              <tr>
                <td>
                  Item
                </td>
                <td>
                  Cant
                </td>
                { this.isAdminToShowPrice() }
              </tr>
              { this.getFoodList(this.props.food) }
            </table>
          </div>
          { this.isAdmin() }
        </div>
      </article>
    )
  }
}

export default OrderItem
