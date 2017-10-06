import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import config from '../../config.js'

let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class FoodItem extends React.Component {
  constructor(props) {
    super(props)
    this.URI = config.url

    this.state = { isAdd: false, cant: 1, isEnabled: this.props.isEnabled, currentValue: this.props.isEnabled, showDetails: false }
    // This binding is necessary to make `this` work in the callback
    this.handleStateClick = this.handleStateClick.bind(this)
    this.isEnabledToCant = this.isEnabledToCant.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)
    this.isEnabledToSale = this.isEnabledToSale.bind(this)
    this.handleFoodStateUpdateClick = this.handleFoodStateUpdateClick.bind(this)
    this.isAdminToUpdateState = this.isAdminToUpdateState.bind(this)
    this.eventShowDetails = this.eventShowDetails.bind(this)

    this.userType = this.props.userType
  }

  handleStateClick() {
    let foodId = this.props.id

    console.log('Element id')

    if (!this.state.isAdd) {
      // Add foodID
      let array = this.props.getListFood()
      array.push({item: foodId, cant: this.state.cant})

      // updade items quantity
      let currentItemsQuantity = this.props.getItemsQuantity()
      currentItemsQuantity += this.state.cant
      this.props.updateItemsQuantity(currentItemsQuantity)

      // update pricing
      let currentPricing = this.props.getitemsBillTotal()
      currentPricing += this.props.price
      this.props.updateitemsBillTotal(currentPricing)


      // update array list
      this.props.setListFood(array)

      this.setState(prevState => ({
        isAdd: !prevState.isAdd
      }))

    } else {
      // Remove foodId
      let array = this.props.getListFood()
      let elementsRemoved = _.remove(array, (element) => {
        return element.item === foodId
      })

      // update items quantity
      let currentItemsQuantity = this.props.getItemsQuantity()
      currentItemsQuantity -= this.state.cant
      this.props.updateItemsQuantity(currentItemsQuantity)

      // update pricing
      let currentPricing = this.props.getitemsBillTotal()
      currentPricing -= (this.props.price * this.state.cant)
      this.props.updateitemsBillTotal(currentPricing)

      // update array list
      this.props.setListFood(array)

      this.setState(prevState => ({
        cant: 1
      }))

      this.setState(prevState => ({
        isAdd: !prevState.isAdd
      }))
    }
  }

  async handleFoodStateUpdateClick() {
    console.log('FINAL DATO to send')
    let foodID = this.props.id

    try {
      // update order
      let payload = {
        isEnabled: this.state.isEnabled
      }

      let result = await requestHTTP(`${this.URI}/api/menu/${foodID}?_method=put`, 'post', payload)
      console.log('ORDER CREATION >>', result)

      this.setState(prevState => ({
        currentValue: this.state.isEnabled
      }))

    } catch (err) {
      console.log('Error API', err)
    }
  }

  handleChangeState(e) {
    console.log('Element selected')
    console.log(e.target)

    console.log('id', typeof this.props.id)

    if (e.target.name === 'cant') {

      let newQuantity = Number(e.target.value)

      // Find element, and update
      let array = this.props.getListFood()

      // remove food from the list
      let elementsRemoved = _.remove(array, (element) => {
        return element.item === this.props.id
      })

      // Update quantity items
      let currentItemsQuantity = this.props.getItemsQuantity()
      currentItemsQuantity -= this.state.cant
      currentItemsQuantity += newQuantity
      this.props.updateItemsQuantity(currentItemsQuantity)

      // Update pricing 
      let currentPricing = this.props.getitemsBillTotal()
      currentPricing -= (this.props.price * this.state.cant)
      currentPricing += (this.props.price * newQuantity)
      this.props.updateitemsBillTotal(currentPricing)

      // Add new food item
      array.push({item: this.props.id, cant: newQuantity})

      // Update food list
      this.props.setListFood(array)

      this.setState({ cant: newQuantity })

    } else if (e.target.name === 'selectState') {
      let value = false
      if (e.target.value === 'Disponible') {
        value = true
      }
      this.setState({ isEnabled: value })

    } else {
      console.log('Error')
    }
  }

  isEnabledToCant() {
    if (this.state.isAdd) {
      return (
        <input type="number" name="cant" onChange={this.handleChangeState} value={ this.state.cant } min="1"/>
      )
    }
  }

  isEnabledToSale() {
    if (!this.state.currentValue) {
      return (
        <span className="badge badge-secondary">NoDisponible</span>
      )
    } else {
      return (
        <span className="badge badge-success">Disponible</span>
      )
    }
  }

  eventShowDetails() {
    // Update button click state
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
    }))

    console.log('ELEMENET ID', this.props.id)

    // Update view state
    this.props.updateViewState(wayView.details)

    // Update content
    this.props.updateFoodDetails(this.props.id)

  }

  userActions() {
    if (this.userType === 'chef') {
      return (
        <div>
          <button onClick={ this.handleStateClick } type="button" className="btn btn-primary">{ this.state.isAdd ? 'Remove' : 'Add' }</button>
          <div>Cant: { this.isEnabledToCant() }</div>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={ this.eventShowDetails } type="button" className="btn btn-primary">Detalles</button>
        </div>
      )
    }
  }

  isAdminToUpdateState() {
    if (this.userType === 'admin') {
      return (
        <div>
          <form>
            <select name="selectState" onChange={ this.handleChangeState } value={this.state.isEnabled ? 'Disponible': 'NoDisponible'}>
              <option>
                Disponible
              </option>
              <option>
                NoDisponible
              </option>
            </select>
            <button onClick={ this.handleFoodStateUpdateClick } type="button" className="btn btn-success">Update</button>
          </form>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  getPricePretty(num) {
    let pretty = (num/100).toFixed(2)
    return `S/${pretty}`
  }

  render() {
    return (
      <article className="Cajero__list-item">
        <div className="Cajero__list-item--cover">
          <img src={this.props.photo || '/static/images/food-outline.png'}></img>
        </div>
        <div className="Cajero__list-item--details">
          <h2 className="title">
            { this.props.name }
          </h2>
          <div>
            { this.isEnabledToSale() }
          </div>
          <div>
            { this.isAdminToUpdateState() }
          </div>
          <p className="pricing">{ this.getPricePretty(this.props.price) }</p>
          <p className="description">{ this.props.description }</p>
          <div>
            { this.userActions() }
          </div>
        </div>
      </article>
    )
  }
}

export default FoodItem
