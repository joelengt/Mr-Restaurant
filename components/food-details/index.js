import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import request from 'request-promise'

let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class FoodDetails extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'

    this.state = { showDetails: false, food: {} }
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

  render() {
    let food = this.state.food
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
            <p>S/{ food.price }</p>
            <p>{ food.fechaCreada }</p>
          </div>
          <div>
            <button type="button" className="btn btn-primary">Edit</button>
            <button type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      </article>
    )
  }
}

export default FoodDetails
