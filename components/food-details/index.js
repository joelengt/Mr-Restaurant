import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import request from 'request-promise'
import config from '../../config.js'

let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class FoodDetails extends React.Component {
  constructor(props) {
    super(props)
    this.URI = config.url

    this.state = { showDetails: false, food: {}, isDeleted: false }

    this.eventEdit = this.eventEdit.bind(this)
    this.eventDelete = this.eventDelete.bind(this)
  }

  componentDidMount () {
    var options = {
      uri: `${this.URI}/api/menu/${this.props.id}`,
      json: true
    };

    request(options)
    .then((result) => {
      console.log('Result API>>', result)

      this.setState(prevState => ({
        food: result.data.item
      }))

    })
    .catch((err) => {
        console.log('Error API', err)
    });
  }

  eventEdit() {
    // Update view state
    console.log('EDIT >>')
    this.props.updateViewState(wayView.edit)
  }

  async eventDelete() {
    try {
      console.log('USER DATA to delete ==> ', this.props.id)

      let result = await requestHTTP(`${this.URI}/api/menu/${this.props.id}?_method=delete`, 'post')
      console.log('ORDER CREATION >>', result)

      this.setState(prevState => ({
        isDeleted: true
      }))

    } catch (err) {
      console.log('Error API', err)
    }
  }

  getPricePretty(num) {
    let pretty = (num/100).toFixed(2)
    return `S/${pretty}`
  }

  render() {
    let food = this.state.food

    if (!this.state.isDeleted) {
        return (
          <article className="Cajero__list-item">
            <div className="Cajero__list-item--details">
              <div>
                <div>
                  <img src={ food.photo }></img>
                </div>
                <h2>id: { food._id }</h2>
                <p>{ food.name }</p>
                <p>{ food.description }</p>
                <p>{ this.getPricePretty(food.price) }</p>
                <p>{ food.fechaCreada }</p>
              </div>
              <div>
                <button onClick={ this.eventEdit } type="button" className="btn btn-primary">Edit</button>
                <button onClick={ this.eventDelete } type="button" className="btn btn-danger">Delete</button>
              </div>
            </div>
          </article>
      )
    } else {
      return (
        <div>Food Deleted</div>
      )
    }

  }
}

export default FoodDetails
