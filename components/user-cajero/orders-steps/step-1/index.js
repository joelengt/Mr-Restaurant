import React from 'react'
import stylesheet from './style.scss'
import FoodList from '../../../food-list'
import request from 'request-promise'
import {requestHTTP} from '../../../../utils'

let waySteps = { step1: 1, step2: 2, step3: 3 }

class Cajero extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    this.handleNextButton = this.handleNextButton.bind(this)
    this.setListFood = this.setListFood.bind(this)
    this.getListFood = this.getListFood.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

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

  handleCancel() {
    console.log('cancel')
    // Clean Items
    this.props.updateItemsQuantity(0)
    // Clean Pricing
    this.props.updateitemsBillTotal(0)

  }

  async handleNextButton() {
    console.log('FINAL DATO >> ', this.getListFood())
    try {

      let listFood = this.getListFood()

      // send event only if  list food, has content
      if (!listFood.length) {
        console.log('Error listFood', listFood.length)
        this.setState(prevState => ({
          nextButton: false
        }))

      } else {
         let clientData = {
          fullName: '',
          dni: ''
        }

        // create client
        let clientResult = await requestHTTP(`${this.URI}/api/clients`, 'post', clientData)
        console.log('Client >>', clientResult.data.item)
        let client = clientResult.data.item

        let igv = this.props.getitemsBillTotal() * 0.18
        let subTotal = this.props.getitemsBillTotal() - igv
        let total = this.props.getitemsBillTotal()
        let quantity = this.props.getItemsQuantity()

        let payload = {
          "emisor": 1,
          "foods": listFood,
          "paymentMethod": "Cash",
          "summary": {
            "items": quantity,
            "igv": igv,
            "subtotal": subTotal,
            "total": total
          },
          "client": client
        }

        // create order
        let result = await requestHTTP(`${this.URI}/api/orders`, 'post', payload)
        console.log('ORDER CREATION >>', result)

        // update orders currentOrder
        this.props.updateCurrentOrder(result.data.item._id)

        this.setState(prevState => ({
          nextButton: true
        }))

        // update view - step 2
        this.props.currentStep(waySteps.step2)
      }
    } catch (err) {
      console.log('Error API', err)
    }
  }

  render() {
    return (
      <div className="Cajero">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Cajero__list">
          <div className="Cajero__list-container">
            <h2>Menu del día</h2>
            <FoodList getItemsQuantity={this.props.getItemsQuantity} updateItemsQuantity={this.props.updateItemsQuantity} getitemsBillTotal={this.props.getitemsBillTotal} updateitemsBillTotal={this.props.updateitemsBillTotal}  getListFood={ this.getListFood } setListFood={ this.setListFood } userType="chef"/>
          </div>
        </div>
        <div className="Cajero__actions">
          <button onClick={ this.handleCancel } type="button" className="btn btn-danger">Cancelar</button>
          <button onClick={ this.handleNextButton } type="button" className="btn btn-success">Siguiente</button>
        </div>
      </div>
    )
  }
}

export default Cajero
