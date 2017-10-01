import React from 'react'
import stylesheet from './style.scss'

class FoodItem extends React.Component {
  constructor(props) {
    super(props)
  }

  isAdmin() {
    if (this.props.userType === 'admin') {
      return (
        <td>
          <p>S/{this.props.price}</p>
        </td>
      )
    }
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
        { this.isAdmin() }
      </tr>
    )
  }
}

export default FoodItem
