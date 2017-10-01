import React from 'react'
import stylesheet from './style.scss'
import request from 'request-promise'
import {requestHTTP} from '../../../../utils'
import FootItem from './food-item'

class Cajero extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    this.handleNextButton = this.handleNextButton.bind(this)
    this.getOrder = this.getOrder.bind(this)
    this.getFoodList = this.getFoodList.bind(this)

    this.state = { order: false }
  }

  componentDidMount () {
    let OrderID = '59cfecdcde6c07b4dcf92218'
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
    let OrderID = '59cfecdcde6c07b4dcf92218'
    try {
      let payload = {
        "isEnabled": true
      }

      let result = await requestHTTP(`${this.URI}/api/orders/${OrderID}?_method=put`, 'post', payload)
      console.log('ORDER CREATION >>', result)

    } catch (err) {
      console.log('Error API', err)
    }
  }

  getFoodList(FoodList) {
    console.log('Food list!!', FoodList)
    let result = FoodList.map((element) => {
      let food = element.item
      return <FootItem id={food._id} key={food._id} name={food.name} price={food.price} cant={element.cant}/>
    })

    return result
  }

  getOrder() {
    let order = this.state.order;
    if (!order) {
      return (<p>Cargando...</p>)
    } else {
      return (<div className="Cajero__list-container">
        <div className="Cajero__list-summary">
          <h3>Orden NRA000{order._id}</h3>
          <p>Nombre: {order.client.fullName}</p>
          <p>DNI: {order.client.dni}</p>
          <h4>List</h4>
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
          <p>Sub Total: S/50.00</p>
          <p>IGV (18%): S/4.00</p>
          <p>Total: S/54.00</p>
        </div>
        <div>
         <button className="btn btn-success">Print to Client</button>
        </div>
      </div>)
    }
  }

  render() {
    return (
      <div className="Cajero">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Cajero__top">
          <div>
            <h2>Cajero - step3</h2>
          </div>
          <div>
            <p>Items: 6</p>
            <p>Total: S/36.00</p>
          </div>
        </div>
        <div className="Cajero__list">
          { this.getOrder() }
        </div>
        <div className="Cajero__actions">
          <button className="btn btn-primary">Back</button>
          <button className="btn btn-danger">Cancelar</button>
          <button onClick={ this.handleNextButton } className="btn btn-success">Listo</button>
        </div>
      </div>
    )
  }
}

export default Cajero
