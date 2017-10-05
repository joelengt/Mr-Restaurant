import React from 'react'
import stylesheet from './style.scss'

class FoodItem extends React.Component {
  constructor(props) {
    super(props)
  }

  getPricePretty(num) {
    let pretty = (num/100).toFixed(2)
    return `S/${pretty}`
  }

  render() {
    return (
      <tr>
        <td>
          <p>{this.props.name}</p>
        </td>
        <td>
          <p>{this.props.cant}</p>
        </td>
        <td>
          <p>{ this.getPricePretty(this.props.price) }</p>
        </td>
      </tr>
    )
  }
}

export default FoodItem
