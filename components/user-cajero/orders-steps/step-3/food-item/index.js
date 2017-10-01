import React from 'react'
import stylesheet from './style.scss'

class FoodItem extends React.Component {
  constructor(props) {
    super(props)
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
          <p>S/{this.props.price}</p>
        </td>
      </tr>
    )
  }
}

export default FoodItem
