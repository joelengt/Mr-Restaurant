import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import request from 'request-promise'


let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class UserCreate extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'

    this.state = { showDetails: false, user: {}, name: '', lastName: '', email: '', phone: '', dni: '', photo: '', password: '', selectState: 3, message: ''}

    this.handleChange = this.handleChange.bind(this)
    this.updateUserData = this.updateUserData.bind(this)
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

    } else if (e.target.name === 'photo') {
      this.setState({ photo: e.target.value })

    } else if (e.target.name === 'password') {
      this.setState({ password: e.target.value })

    } else if (e.target.name === 'selectState') {
      this.setState({ selectState: Number(e.target.value) })

    } else {
      console.log('Error')
    }
  }

  async updateUserData() {
    try {

      let payload = {
        user_type_id: this.state.selectState,
        name: this.state.name,
        last_name: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone,
        dni: this.state.dni,
        photo: this.state.photo,
        password : this.state.password
      }

      if (payload.name !== '' &&
          payload.last_name !== '' &&
          payload.email !== '' &&
          payload.phone !== '' &&
          payload.dni !== '' &&
          payload.photo !== '' &&
          payload.password !== '') {

        console.log('USER DATA', payload)

        let result = await requestHTTP(`${this.URI}/api/users`, 'post', payload)
        console.log('ORDER CREATION >>', result)

        if (result.state === 201) {
           // clean states
          this.setState({ name: '' })
          this.setState({ lastName: '' })
          this.setState({ email: '' })
          this.setState({ phone: '' })
          this.setState({ dni: '' })
          this.setState({ photo: '' })
          this.setState({ password: '' })

          this.setState({ message: ''})

        } else {
          this.setState({ message: result.message })
        }

      } else {
        this.setState({ message: 'All the fields are required' })
      }

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
              <label for="name">Cargo</label>
              <select name="selectState" onChange={ this.handleChange }>
                <option value="3">
                  Chef
                </option>
                <option value="2">
                  Cajero
                </option>
                <option value="1">
                  Admin
                </option>
              </select>
            </div>
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
            <div className="form-group">
              <label for="photo">photo</label>
              <input type="text" className="form-control" name="photo" id="photo" aria-describedby="nameHelp" placeholder="Ingresar url del producto" value={this.state.photo} onChange={this.handleChange}/>
            </div>
            <div>
              <div className="form-group">
                <label for="photo">password</label>
                <input type="password" className="form-control" name="password" id="password" aria-describedby="nameHelp" placeholder="Ingresar password" value={this.state.password} onChange={this.handleChange}/>
              </div>
            </div>
          </form>
          <div>
            <button onClick={this.updateUserData} type="button" className="btn btn-success">Save</button>
          </div>
          <div>
            { this.state.message }
          </div>
        </div>
      </article>
    )
  }
}

export default UserCreate
