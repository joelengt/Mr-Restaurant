import React from 'react'
import FoodItem from '../food-item'
import stylesheet from './style.scss'
import request from 'request-promise'
import Promise from 'bluebird'
import {requestHTTP} from '../../utils'

class FoodList extends React.Component {
  constructor(props) {
    super(props)

    this.URI = 'http://localhost:3000'

    // This binding is necessary to make `this` work in the callback
    this.setListFood = this.setListFood.bind(this)
    this.getListFood = this.getListFood.bind(this)

    this.state = { listFood: [] }

  }

  setListFood(array) {
    // event add or remove
    this.props.setListFood(array)
  }

  getListFood() {
    return this.props.getListFood()
  }

  componentDidMount () {
    var options = {
      uri: `${this.URI}/api/menu`,
      json: true
    };

    request(options)
    .then((result) => {
      console.log('Result API>>', result)

      this.setState(prevState => ({
        listFood: result.data.items
      }))

    })
    .catch((err) => {
        console.log('Error API', err)
    });
  }

  getData(data) {
    let response = data.map((element) => {
      return <FoodItem id={element._id} key={element._id} name={element.name} description={element.description} photo={element.photo} price={element.price} getListFood={ this.getListFood } setListFood={ this.setListFood }/>
    })

    return response
  }

  render() {
    let elements = this.state.listFood

    if (!elements.length) {
      return (<div>Cargando...</div>)
    } else {
      return (
        <div className="FoodList">
          <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
          { this.getData(elements) }
        </div>
      )
    }
  }
}

export default FoodList
