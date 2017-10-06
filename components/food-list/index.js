import React from 'react'
import FoodItem from '../food-item'
import stylesheet from './style.scss'
import request from 'request-promise'
import Promise from 'bluebird'
import {requestHTTP} from '../../utils'
import FoodDetails from '../food-details'
import FoodEdit from '../food-edit'
import FoodCreate from '../food-create'
import config from '../../config.js'

let wayView = { mainList: 'mainList', details: 'details', edit: 'edit', create: 'create' }

class FoodList extends React.Component {
  constructor(props) {
    super(props)

    this.URI = config.url
    this.state = { listFood: [], currentView: wayView.mainList, currentFoodDetails: '' }

    // This binding is necessary to make `this` work in the callback
    this.setListFood = this.setListFood.bind(this)
    this.getListFood = this.getListFood.bind(this)
    this.updateViewState = this.updateViewState.bind(this)
    this.updateFoodDetails = this.updateFoodDetails.bind(this)
    this.eventCreateForm = this.eventCreateForm.bind(this)
    this.isAdminToCreateFood = this.isAdminToCreateFood.bind(this)

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
      return <FoodItem getItemsQuantity={this.props.getItemsQuantity} updateItemsQuantity={this.props.updateItemsQuantity} getitemsBillTotal={this.props.getitemsBillTotal} updateitemsBillTotal={this.props.updateitemsBillTotal} updateViewState={this.updateViewState} updateFoodDetails={this.updateFoodDetails} id={element._id} key={element._id} name={element.name} description={element.description} photo={element.photo} price={element.price} isEnabled={element.isEnabled} getListFood={ this.getListFood } setListFood={ this.setListFood } userType={this.props.userType}/>
    })

    return response
  }

  eventCreateForm() {
    this.updateViewState(wayView.create)
  }

  isAdminToCreateFood() {
    if (this.props.userType === 'admin') {
      return (
        <div>
          <button onClick={ this.eventCreateForm } type="button" className="btn btn-success">New Food</button>
        </div>
      )
    }
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
              { this.isAdminToCreateFood() }
              <div>
                { this.getData(elements) }
              </div>
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

      case wayView.create:
        return (<FoodCreate/>)
        break;
    }

  }
}

export default FoodList
