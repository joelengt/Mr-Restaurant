import React from 'react'
import stylesheet from './style.scss'
import FoodList from '../food-list'
import request from 'request-promise'
import {requestHTTP} from '../../utils'
import Step1 from './orders-steps/step-1'
import Step2 from './orders-steps/step-2'
import Step3 from './orders-steps/step-3'

let waySteps = { step1: 1, step2: 2, step3: 3 }

class Cajero extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
  
    this.eventCurrentStep = this.eventCurrentStep.bind(this)
    this.updateCurrentStep = this.updateCurrentStep.bind(this)
    this.getCurrentOrder = this.getCurrentOrder.bind(this)
    this.updateCurrentOrder = this.updateCurrentOrder.bind(this)

    this.getItemsQuantity = this.getItemsQuantity.bind(this)
    this.updateItemsQuantity = this.updateItemsQuantity.bind(this)

    this.getitemsBillTotal = this.getitemsBillTotal.bind(this)
    this.updateitemsBillTotal = this.updateitemsBillTotal.bind(this)


    this.state = { nextButton: false, currentStep: waySteps.step1, currentOrder: '', itemsQuantity: 0, itemsBillTotal: 0 }
  }

  updateCurrentStep(step) {
    this.setState(prevState => ({
      currentStep: step
    }))
  }

  updateCurrentOrder(orderID) {
     this.setState(prevState => ({
      currentOrder: orderID
    }))
  }

  getCurrentOrder() {
    return this.state.currentOrder
  }

  getItemsQuantity() {
    return this.state.itemsQuantity
  }

  updateItemsQuantity(quantity) {
    this.setState(prevState => ({
      itemsQuantity: quantity
    }))
  }

  getitemsBillTotal() {
    return this.state.itemsBillTotal
  }

  updateitemsBillTotal(price) {
    this.setState(prevState => ({
      itemsBillTotal: price
    }))
  }

  eventCurrentStep() {
    switch (this.state.currentStep) {
      case waySteps.step1:
        return (<Step1 getItemsQuantity={this.getItemsQuantity} getitemsBillTotal={this.getitemsBillTotal} updateItemsQuantity={this.updateItemsQuantity} updateitemsBillTotal={this.updateitemsBillTotal} currentStep={this.updateCurrentStep} updateCurrentOrder={this.updateCurrentOrder} getCurrentOrder={this.getCurrentOrder}/>)
        break;

      case waySteps.step2:
        return (<Step2 updateItemsQuantity={this.updateItemsQuantity} updateitemsBillTotal={this.updateitemsBillTotal} currentStep={this.updateCurrentStep} updateCurrentOrder={this.updateCurrentOrder} getCurrentOrder={this.getCurrentOrder}/>)
        break;

      case waySteps.step3:
        return (<Step3 updateItemsQuantity={this.updateItemsQuantity} updateitemsBillTotal={this.updateitemsBillTotal} getItemsQuantity={this.getItemsQuantity} getitemsBillTotal={this.getitemsBillTotal} currentStep={this.updateCurrentStep} updateCurrentOrder={this.updateCurrentOrder} getCurrentOrder={this.getCurrentOrder}/>)
        break;
    }
  }

  getPricePretty(num) {
    let pretty = (num/100).toFixed(2)
    return `S/${pretty}`
  }

  render() {
    return (
      <div className="Cajero">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Cajero__top">
         <div>
           <h2>Cajero - step { this.state.currentStep }</h2>
         </div>
         <div>
           <p>Items: { this.state.itemsQuantity }</p>
           <p>Total: { this.getPricePretty(this.state.itemsBillTotal) }</p>
         </div>
        </div>
        <div>
          { this.eventCurrentStep() }
        </div>
      </div>
    )
  }
}

export default Cajero
