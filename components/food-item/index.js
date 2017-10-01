import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'

class FoodItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isAdd: false, cant: 2 }
    // This binding is necessary to make `this` work in the callback
    this.handleStateClick = this.handleStateClick.bind(this)
    this.isEnabledToCant = this.isEnabledToCant.bind(this)
    this.handleChangeCant = this.handleChangeCant.bind(this)

  }

  handleStateClick() {
    let foodId = this.props.id

    console.log('Element id')

    if (!this.state.isAdd) {
      // Add foodID
      let array = this.props.getListFood()
      array.push({item: foodId, cant: this.state.cant})

      // update array list
      this.props.setListFood(array)

      this.setState(prevState => ({
        isAdd: !prevState.isAdd
      }))

    } else {
      // Remove foodId
      let array = this.props.getListFood()
      let elementsRemoved = _.remove(array, (element) => {
        return element.item === foodId
      })

      // update array list
      this.props.setListFood(array)

      this.setState(prevState => ({
        isAdd: !prevState.isAdd
      }))
    }
  }

  handleChangeCant(e) {
    console.log('Element selected')
    console.log(e.target)

    console.log('id', typeof this.props.id)

    if (e.target.name === 'cant') {
      // this.setState({ cant: Number(e.target.value) })

      // Find element, and update
      let array = this.props.getListFood()

      // remove food from the list
      let elementsRemoved = _.remove(array, (element) => {
        return element.item === this.props.id
      })

      // Add new food item
      array.push({item: this.props.id, cant: Number(e.target.value)})

      // Update food list
      this.props.setListFood(array)

    } else {
      console.log('Error')
    }
  }

  isEnabledToCant() {
    if (this.state.isAdd) {
      return (
        <input type="number" name="cant" onChange={this.handleChangeCant}/>
      )
    }
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
          <div>
            { this.isEnabledToCant() }
          </div>
        </div>
      </article>
    )
  }
}

export default FoodItem
