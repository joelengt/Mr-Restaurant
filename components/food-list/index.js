import React from 'react'
import FoodItem from '../food-item'
import stylesheet from './style.scss'
import request from 'request-promise'
import Promise from 'bluebird'
import {requestHTTP} from '../../utils'
import FoodDetails from '../food-details'
import FoodEdit from '../food-edit'

let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class FoodList extends React.Component {
  constructor(props) {
    super(props)

    this.URI = 'http://localhost:3000'
    this.state = { listFood: [], currentView: wayView.mainList, currentFoodDetails: '' }

    // This binding is necessary to make `this` work in the callback
    this.setListFood = this.setListFood.bind(this)
    this.getListFood = this.getListFood.bind(this)
    this.updateViewState = this.updateViewState.bind(this)
    this.updateFoodDetails = this.updateFoodDetails.bind(this)

  }

  setListFood(array) {
    // event add or remove
    this.props.setListFood(array)
  }

  getListFood() {
    return this.props.getListFood()
  }

  updateViewState (viewState) {
    this.setState(prevState => ({
      currentView: viewState
    }))
  }

  updateFoodDetails (foodID) {
    this.setState(prevState => ({
      currentFoodDetails: foodID
    }))
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
      return <FoodItem updateViewState={this.updateViewState} updateFoodDetails={this.updateFoodDetails} id={element._id} key={element._id} name={element.name} description={element.description} photo={element.photo} price={element.price} isEnabled={element.isEnabled} getListFood={ this.getListFood } setListFood={ this.setListFood } userType={this.props.userType}/>
    })

    return response
  }

  render() {
    let elements = this.state.listFood
    let foodID = this.state.currentFoodDetails

    switch (this.state.currentView) {
      case wayView.mainList:
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
        break;

      case wayView.details:
        if (!foodID) {
          return <div>User Not Found</div>
        }
        return (<FoodDetails id={foodID} updateViewState={this.updateViewState}/>)
        break;

      case wayView.edit:
        if (!foodID) {
          return <div>User Not Found</div>
        }
        return (<FoodEdit id={foodID}/>)
        break;
    }

  }
}

export default FoodList
