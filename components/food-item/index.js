import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'

class FoodItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isAdd: false }
    // This binding is necessary to make `this` work in the callback
    this.handleStateClick = this.handleStateClick.bind(this)
  }

  handleStateClick() {
    let foodId = this.props.id

    if (!this.state.isAdd) {
      // Add foodID
      let array = this.props.getListFood()
      array.push(foodId)

      // update array list
      this.props.setListFood(array)

      this.setState(prevState => ({
        isAdd: !prevState.isAdd
      }))

    } else {
      // Remove foodId
      let array = this.props.getListFood()
      let elementsRemoved = _.remove(array, (element) => {
        return element === foodId
      })

      // update array list
      this.props.setListFood(array)

      this.setState(prevState => ({
        isAdd: !prevState.isAdd
      }))
    }

    console.log("current result ->>", this.props.getListFood())
  }

  render() {
    return (
      <article className="Cajero__list-item">
        <div className="Cajero__list-item--cover">
          <img src="http://www.mujeremprendedoralac.org/dev/wp-content/uploads/2015/10/cropped-ICONOpeque%C3%B1o.png"></img>
        </div>
        <div className="Cajero__list-item--details">
          <h2 className="title">
            { this.props.name }
          </h2>
          <p className="pricing">S/{ this.props.price }</p>
          <p className="description">{ this.props.description }</p>
          <button onClick={ this.handleStateClick } type="button" className="btn btn-primary">Select</button>
          <div>
            <p>{ this.state.isAdd ? 'Remove' : 'Add' }</p>
          </div>
        </div>
      </article>
    )
  }
}

export default FoodItem
