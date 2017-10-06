import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import request from 'request-promise'
import config from '../../config.js'

let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class FoodEdit extends React.Component {
  constructor(props) {
    super(props)
    this.URI = config.url

    this.state = { showDetails: false, user: {}, name: '', description: '', price: 0, photo: '' }

    this.handleChange = this.handleChange.bind(this)
    this.updateUserData = this.updateUserData.bind(this)
  }

  componentDidMount () {
    var options = {
      uri: `${this.URI}/api/menu/${this.props.id}`,
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
        description: user.description,
        price: user.price,
        photo: user.photo
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

      let result = await requestHTTP(`${this.URI}/api/menu/${this.props.id}?_method=put`, 'post', payload)
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
              <label for="description">Description</label>
              <input type="text" className="form-control" name="description" id="description" aria-describedby="nameHelp" placeholder="Ingresar la descripcion" value={this.state.description} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="price">price</label>
              <input type="text" className="form-control" name="price" id="price" aria-describedby="nameHelp" placeholder="Ingresar el price" value={this.state.price} onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label for="photo">photo</label>
              <input type="text" className="form-control" name="photo" id="photo" aria-describedby="nameHelp" placeholder="Ingresar url del producto" value={this.state.photo} onChange={this.handleChange}/>
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

export default FoodEdit
