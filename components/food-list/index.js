import React from 'react'
import FoodItem from '../food-item'
import stylesheet from './style.scss'
import rp from 'request-promise'
import Promise from 'bluebird'

class FoodList extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.setListFood = this.setListFood.bind(this)
    this.getListFood = this.getListFood.bind(this)

    this.foodList = []
    this.state = { listFood: [] }

  }

  setListFood(array) {
    // event add or remove
    this.foodList = array
  }

  getListFood() {
    return this.foodList
  }

  componentWillMount () {
    console.log('LLAMADO AJAX')

    var options = {
      uri: 'http://localhost:3000/api/menu',
      json: true
    };

    rp(options)
    .then((result) => {
      console.log('Result API>>', typeof result)

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
    console.log('Render')
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
