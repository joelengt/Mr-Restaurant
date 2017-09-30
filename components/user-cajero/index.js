import React from 'react'
import stylesheet from './style.scss'
import FoodList from '../food-list'
import request from 'request-promise'
import {requestHTTP} from '../../utils'

class Cajero extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    this.handleNextButton = this.handleNextButton.bind(this)
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
        let payload = {
          "emisor": 1,
          "foods": listFood,
          "paymentMethod": "Cash",
          "summary": {
            "igv": 2000,
            "subtotal": 5600,
            "total": 7600
          }
        }

        let result = await requestHTTP(`${this.URI}/api/orders`, 'post', payload)
        console.log('ORDER CREATION >>', result)

        // reset listFood
        this.setListFood([])

        this.setState(prevState => ({
          nextButton: true
        }))
      }
    } catch (err) {
      console.log('Error API', err)
    }
  }

  render() {
    return (
      <div className="Cajero">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Cajero__top">
         <div>
           <h2>Cajero - step1</h2>
         </div>
         <div>
           <p>Items: 6</p>
           <p>Total: S/36.00</p>
         </div>
        </div>
        <div className="Cajero__list">
          <div className="Cajero__list-container">
            <h2>Menu del día</h2>
            <FoodList getListFood={ this.getListFood } setListFood={ this.setListFood }/>
          </div>
        </div>
        <div className="Cajero__actions">
        <button type="button" className="btn btn-danger">Cancelar</button>
        <button onClick={ this.handleNextButton } type="button" className="btn btn-success">Siguiente</button>
        <p>{ this.state.nextButton ? 'Enviado' : 'Not' }</p>
        </div>
      </div>
    )
  }
}

export default Cajero
