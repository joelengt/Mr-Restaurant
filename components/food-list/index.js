import React from 'react'
import FoodItem from '../food-item'
import stylesheet from './style.scss'

class FoodList extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.setListFood = this.setListFood.bind(this)
    this.getListFood = this.getListFood.bind(this)

    this.foodList = []
  }

  setListFood(array) {
    // event add or remove
    this.foodList = array
  }

  getListFood() {
    return this.foodList
  }

  getData() {
    let data = [
      {
          "_id": "59c536abebee374157a1bdf1",
          "name": "food 2",
          "description": "so tasty1",
          "photo": "sample1",
          "__v": 0,
          "fechaCreada": "2017-09-22T16:13:31.191Z",
          "isEnabled": false,
          "price": 2300
      },
      {
          "_id": "59c536bdebee374157a1bdf2",
          "name": "food 1",
          "description": "so tasty",
          "photo": "sample",
          "__v": 0,
          "fechaCreada": "2017-09-22T16:13:49.850Z",
          "isEnabled": false,
          "price": 2000
      },
      {
          "_id": "59c86328e69ef044d99f57c1",
          "name": "food 3",
          "description": "so tasty more",
          "photo": "sample",
          "__v": 0,
          "fechaCreada": "2017-09-25T02:00:08.605Z",
          "isEnabled": false,
          "price": 2500
      },
      {
          "_id": "59c86331e69ef044d99f57c2",
          "name": "food chaufa",
          "description": "so tasty test",
          "photo": "sample",
          "__v": 0,
          "fechaCreada": "2017-09-25T02:00:17.827Z",
          "isEnabled": false,
          "price": 1500
      },
      {
          "_id": "59c86338e69ef044d99f57c3",
          "name": "food more more",
          "description": "so tasty test",
          "photo": "sample",
          "__v": 0,
          "fechaCreada": "2017-09-25T02:00:24.372Z",
          "isEnabled": false,
          "price": 2900
      }
    ]

    let response = data.map((element) => {
      return <FoodItem id={element._id} key={element._id} name={element.name} description={element.description} photo={element.photo} price={element.price} getListFood={ this.getListFood } setListFood={ this.setListFood }/>
    })

    return response
  }

  render() {
    return (
      <div className="FoodList">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        { this.getData() }
      </div>
    )
  }
}

export default FoodList
