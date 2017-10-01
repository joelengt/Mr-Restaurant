import React from 'react'
import stylesheet from './style.scss'
import OrdersList from '../../orders-list'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.data = props.options
  }

  render() {
    return (
      <div>
        <h2>Orders</h2>
        <div>
          <input type="date"/>
        </div>
        <OrdersList userType="admin"/>
        <div>
          <p>Ventas del día: 159</p>
          <p>Ingresos del día: S/3500.00</p>
        </div>
      </div>
    )
  }
}

export default Index
