import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import request from 'request-promise'


let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class UserEdit extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'

    this.state = { showDetails: false, user: {}, name: '', lastName: '', email: '', phone: '', dni: ''}

    this.handleChange = this.handleChange.bind(this)
    this.updateUserData = this.updateUserData.bind(this)
  }

  componentDidMount () {
    var options = {
      uri: `${this.URI}/api/users/${this.props.id}`,
      json: true
    };

    request(options)
    .then((result) => {
      console.log('Result API>>', result)

      let user = result.data.item

      this.setState(prevState => ({
        user: user
      }))

      this.setState(prevState => ({
        name: user.name,
        lastName: user.last_name,
        email: user.email,
        phone: user.phone,
        dni: user.dni
      }))

    })
    .catch((err) => {
        console.log('Error API', err)
    });
  }

  handleChange(e) {
    console.log('Element selected')
    console.log(e.target.name)

    if (e.target.name === 'name') {
      this.setState({ name: e.target.value })

    } else if (e.target.name === 'lastName') {
      this.setState({ lastName: e.target.value })

    } else if (e.target.name === 'email') {
      this.setState({ email: e.target.value })

    } else if (e.target.name === 'phone') {
      this.setState({ phone: e.target.value })

    } else if (e.target.name === 'dni') {
      this.setState({ dni: e.target.value })

    } else {
      console.log('Error')
    }
  }

  async updateUserData() {
    try {

      let payload = {
        name: this.state.name,
        last_name: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        dni: this.state.dni
      }

      console.log('USER DATA', payload)

      let result = await requestHTTP(`${this.URI}/api/users/${this.props.id}?_method=put`, 'post', payload)
      console.log('ORDER CREATION >>', result)

    } catch (err) {
      console.log('Error API', err)
    }
  }

  render() {
    let user = this.state.user
    return (
      <article className="Cajero__list-item">
        <div className="Cajero__list-item--details">
          <form>
            <div className="form-group">
              <label for="name">Nombre</label>
              <input type="text" className="form-control" name="name" id="name" aria-describedby="nameHelp" placeholder="Ingresar el nombre" value={this.state.name} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="lastName">Apellido</label>
              <input type="text" className="form-control" name="lastName" id="lastName" aria-describedby="nameHelp" placeholder="Ingresar el Apellido" value={this.state.lastName} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="email">Email</label>
              <input type="email" className="form-control" name="email" id="email" aria-describedby="nameHelp" placeholder="Ingresar el email" value={this.state.email} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="phone">phone</label>
              <input type="text" className="form-control" name="phone" id="phone" aria-describedby="nameHelp" placeholder="Ingresar el telefono" value={this.state.phone} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="dni">DNI</label>
              <input type="number" className="form-control" name="dni" id="dni" aria-describedby="nameHelp" placeholder="Ingresar el dni" value={this.state.dni} onChange={this.handleChange}/>
            </div>
          </form>
          <div>
            <button onClick={this.updateUserData} type="button" className="btn btn-success">Save</button>
          </div>
        </div>
      </article>
    )
  }
}

export default UserEdit
