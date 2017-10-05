import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import request from 'request-promise'


let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class FoodCreate extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'

    this.state = { showDetails: false, user: {}, name: '', description: '', price: 0, photo: '', message: '' }

    this.handleChange = this.handleChange.bind(this)
    this.updateUserData = this.updateUserData.bind(this)
  }

  handleChange(e) {
    console.log('Element selected')
    console.log(e.target.name)

    if (e.target.name === 'name') {
      this.setState({ name: e.target.value })

    } else if (e.target.name === 'description') {
      this.setState({ description: e.target.value })

    } else if (e.target.name === 'email') {
      this.setState({ email: e.target.value })

    } else if (e.target.name === 'photo') {
      this.setState({ photo: e.target.value })

    } else if (e.target.name === 'price') {
      this.setState({ price: e.target.value })

    } else {
      console.log('Error')
    }
  }

  async updateUserData() {
    try {

      let payload = {
        name: this.state.name,
        description: this.state.description,
        price: this.state.price,
        photo: this.state.photo
      }

      console.log('USER DATA', payload)

      // validate fields
      if (payload.name !== '' &&
          payload.description !== '' &&
          payload.price !== 0 &&
          payload.photo !== '') {

        let result = await requestHTTP(`${this.URI}/api/menu`, 'post', payload)
        console.log('ORDER CREATION >>', result)

        if (result.status === 201) {
          // Clean status
          this.setState({ name: '' })
          this.setState({ description: '' })
          this.setState({ price: 0 })
          this.setState({ photo: '' })

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
              <label for="name">Nombre</label>
              <input type="text" className="form-control" name="name" id="name" aria-describedby="nameHelp" placeholder="Ingresar el nombre" value={this.state.name} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="description">Description</label>
              <input type="text" className="form-control" name="description" id="description" aria-describedby="nameHelp" placeholder="Ingresar la descripcion" value={this.state.description} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="price">price</label>
              <input type="number" className="form-control" name="price" id="price" aria-describedby="nameHelp" placeholder="Ingresar el price" value={this.state.price} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="photo">photo</label>
              <input type="text" className="form-control" name="photo" id="photo" aria-describedby="nameHelp" placeholder="Ingresar url del producto" value={this.state.photo} onChange={this.handleChange}/>
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

export default FoodCreate
