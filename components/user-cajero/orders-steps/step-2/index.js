import React from 'react'
import stylesheet from './style.scss'
import request from 'request-promise'
import {requestHTTP} from '../../../../utils'

let waySteps = { step1: 1, step2: 2, step3: 3 }

class Cajero extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    this.handleNextButton = this.handleNextButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handlePrevButton = this.handlePrevButton.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.state = { nextButton: false, name: '', dni: '', payment: ''}
  }

  async handleNextButton() {
    console.log('FINAL DATO to send')
    let OrderID = this.props.getCurrentOrder()
    let clientID = ''
    try { 

      // Get order data
      let response = await requestHTTP(`${this.URI}/api/orders/${OrderID}`, 'get')

      console.log('Data', response.data.item)

      // clientID
      let order = response.data.item

      clientID = order.client._id

      let clientData = {
        fullName: this.state.name,
        dni: this.state.dni
      }

      // update client
      let clientResult = await requestHTTP(`${this.URI}/api/clients/${clientID}?_method=put`, 'post', clientData)
      console.log('Client >>', clientResult.data.item)
      let client = clientResult.data.item

      // update order
      let payload = {
        paymentMethod: this.state.payment,
        client: client._id
      }

      let result = await requestHTTP(`${this.URI}/api/orders/${OrderID}?_method=put`, 'post', payload)
      console.log('ORDER CREATION >>', result)

      this.props.currentStep(waySteps.step3)

    } catch (err) {
      console.log('Error API', err)
    }
  }

  handlePrevButton() {
    this.props.currentStep(waySteps.step1)
  }

  handleChange(e) {
    console.log('Element selected')
    console.log(e.target.name)

    if (e.target.name === 'inputName') {
      this.setState({ name: e.target.value })

    } else if (e.target.name === 'inputDNI') {
      this.setState({ dni: e.target.value })

    } else if (e.target.name === 'paymentRadios') {
      this.setState({ payment: e.target.value })

    } else {
      console.log('Error')
    }
  }

  async handleCancel() {
    console.log('FINAL DATO to send')
    let OrderID = this.props.getCurrentOrder()

    // Clean Items
    this.props.updateItemsQuantity(0)
    // Clean Pricing
    this.props.updateitemsBillTotal(0)

    try {
      let result = await requestHTTP(`${this.URI}/api/orders/${OrderID}?_method=delete`, 'post')
      console.log('ORDER CREATION >>', result)

      this.props.currentStep(waySteps.step1)

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
            <div>
              <form>
                <div className="">
                  <div>
                    <h2>Datos del Client</h2>
                  </div>
                  <div className="form-group">
                    <label for="name">Name</label>
                    <input type="name" className="form-control" name="inputName" aria-describedby="nameHelp" placeholder="Enter name" onChange={this.handleChange} value={this.state.name}/>
                  </div>
                  <div className="form-group">
                    <label for="dni">DNI</label>
                    <input type="number" className="form-control" name="inputDNI" placeholder="dni" onChange={this.handleChange} value={this.state.dni}/>
                  </div>
                </div>
                <div>
                  <div>
                    <h2>Method Payment</h2>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="paymentRadios" id="radioCash" value="Cash" onClick={this.handleChange}/>
                    <label class="form-check-label" for="radioCash">Cash</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="paymentRadios" id="radioDebitCard" value="DebitCard" onClick={this.handleChange}/>
                    <label class="form-check-label" for="radioDebitCard">DebitCard</label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="paymentRadios" id="radioCreditCard" value="CreditCard" onClick={this.handleChange}/>
                    <label class="form-check-label" for="radioCreditCard">CreditCard</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="Cajero__actions">
          <button onClick={ this.handleCancel } className="btn btn-danger">Cancelar</button>
          <button onClick={ this.handlePrevButton } className="btn btn-primary">Back</button>
          <button onClick={ this.handleNextButton } className="btn btn-success">Siguiente</button>
        </div>
      </div>
    )
  }
}

export default Cajero
