import React from 'react'
import stylesheet from './style.scss'
import request from 'request-promise'
import {requestHTTP} from '../../../../utils'
import FootItem from './food-item'

let waySteps = { step1: 1, step2: 2, step3: 3 }

class Cajero extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    this.handleNextButton = this.handleNextButton.bind(this)
    this.getOrder = this.getOrder.bind(this)
    this.getFoodList = this.getFoodList.bind(this)
    this.handlePrevButton = this.handlePrevButton.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.state = { order: false }
  }

  componentDidMount () {
    let OrderID = this.props.getCurrentOrder()
    var options = {
      uri: `${this.URI}/api/orders/${OrderID}`,
      json: true
    };

    request(options)
    .then((result) => {
      console.log('Result API ORDER >>', result)

      this.setState(prevState => ({
        order: result.data.item
      }))

    })
    .catch((err) => {
        console.log('Error API', err)
    });
  }

  async handleNextButton() {
    console.log('FINAL DATO to send')
    let OrderID = this.props.getCurrentOrder()

    // Clean Items
    this.props.updateItemsQuantity(0)
    // Clean Pricing
    this.props.updateitemsBillTotal(0)
    
    try {
      let payload = {
        "isEnabled": true
      }

      let result = await requestHTTP(`${this.URI}/api/orders/${OrderID}?_method=put`, 'post', payload)
      console.log('ORDER CREATION >>', result)

      this.props.currentStep(waySteps.step1)

    } catch (err) {
      console.log('Error API', err)
    }
  }

  getFoodList(FoodList) {
    console.log('Food list!!', FoodList)
    let result = FoodList.map((element) => {
      let food = element.item
      if (food) {
        return <FootItem id={food._id} key={food._id} name={food.name} price={food.price} cant={element.cant}/>
      }
    })

    return result
  }

  getPricePretty(num) {
    let pretty = (num/100).toFixed(2)
    return `S/${pretty}`
  }

  getOrder() {
    let order = this.state.order;
    if (!order) {
      return (<p>Cargando...</p>)
    } else {

      let igv = this.props.getitemsBillTotal() * 0.18
      let subTotal = this.props.getitemsBillTotal() - igv
      let total = this.props.getitemsBillTotal()

      return (<div className="Cajero__list-container">
        <div className="Cajero__list-summary">
          <h3>Orden NRA000{order._id}</h3>
          <p>Nombre: {order.client.fullName}</p>
          <p>DNI: {order.client.dni}</p>
          <p>paymentMethod: { order.paymentMethod }</p>
          <h4>List Items</h4>
          <table>
            <tr>
              <td>
                Item
              </td>
              <td>
                Cant
              </td>
              <td>
                Price
              </td>
            </tr>
            { this.getFoodList(order.foods) }
          </table>
         <div>
           <h4>Summary</h4>
           <p>Sub Total: { this.getPricePretty(order.summary.subtotal) }</p>
           <p>IGV (18%): { this.getPricePretty(order.summary.igv) }</p>
           <p>Total: { this.getPricePretty(order.summary.total) }</p>
         </div>
        </div>
        <div>
         <button className="btn btn-success">Print to Client</button>
        </div>
      </div>)
    }
  }

  handlePrevButton() {
    this.props.currentStep(waySteps.step2)
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
          { this.getOrder() }
        </div>
        <div className="Cajero__actions">
          <button onClick={ this.handleCancel } className="btn btn-danger">Cancelar</button>
          <button onClick={ this.handlePrevButton } className="btn btn-primary">Back</button>
          <button onClick={ this.handleNextButton } className="btn btn-success">Listo</button>
        </div>
      </div>
    )
  }
}

export default Cajero
