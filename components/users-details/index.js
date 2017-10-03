import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import request from 'request-promise'


let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class UserItem extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'

    this.state = { showDetails: false, user: {} }

    this.eventEdit = this.eventEdit.bind(this)
    this.eventDelete = this.eventDelete.bind(this)
    
  }

  componentDidMount () {
    var options = {
      uri: `${this.URI}/api/users/${this.props.id}`,
      json: true
    };

    request(options)
    .then((result) => {
      console.log('Result API>>', result)

      this.setState(prevState => ({
        user: result.data.item
      }))

    })
    .catch((err) => {
        console.log('Error API', err)
    });
  }

  eventEdit() {
    // Update view state
    this.props.updateViewState(wayView.edit)
  }

  eventDelete() {

  }

  render() {
    let user = this.state.user
    return (
      <article className="Cajero__list-item">
        <div className="Cajero__list-item--cover">
          <img src={ user.photo }></img>
        </div>
        <div className="Cajero__list-item--details">
          <h2>id: { user.id } - { user.user_type_icon } - { user.user_type_title }</h2>
          <p className="title">
            Nombre: { user.name }
          </p>
          <p>Apellido: { user.last_name }</p>
          <p>Email: { user.email } </p>
          <p>phone: { user.phone } </p>
          <p>Creado: { user.created_at }</p>
          <div>
            <button onClick={ this.eventEdit } type="button" className="btn btn-primary">Edit</button>
            <button onClick={ this.eventDelete } type="button" className="btn btn-danger">Delete</button>
          </div>
        </div>
      </article>
    )
  }
}

export default UserItem
