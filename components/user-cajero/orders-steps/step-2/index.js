import React from 'react'
import stylesheet from './style.scss'
import request from 'request-promise'
import {requestHTTP} from '../../../../utils'

class Cajero extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    this.handleNextButton = this.handleNextButton.bind(this)
    this.handleChange = this.handleChange.bind(this);

    this.state = { nextButton: true, name: '', dni: '', payment: ''}
  }

  async handleNextButton() {
    console.log('FINAL DATO to send')
    try {
      let data = {
        name: this.state.name,
        dni: this.state.dni,
        payment: this.state.payment,
      };

      this.setState(prevState => ({
        nextButton: true
      }))

      console.log(data)
    } catch (err) {
      console.log('Error API', err)
    }
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

  render() {
    return (
      <div className="Cajero">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Cajero__top">
          <div>
            <h2>Cajero - step2</h2>
          </div>
          <div>
            <p>Items: 6</p>
            <p>Total: S/36.00</p>
          </div>
        </div>
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
          <button className="btn btn-primary">Back</button>
          <button className="btn btn-danger">Cancelar</button>
          <button onClick={ this.handleNextButton } className="btn btn-success">Siguiente</button>
          <p>{ this.state.nextButton ? 'Enviado' : 'Not' }</p>
        </div>
      </div>
    )
  }
}

export default Cajero
