import React from 'react'
import stylesheet from './style.scss'
import {requestHTTP} from '../../utils'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'

    this.state = { email: '', password: '', message: '' }

    this.eventLogin = this.eventLogin.bind(this)
    this.handleChange = this.handleChange.bind(this)

  }

  async eventLogin() {
    try {

      let payload = {
        email: this.state.email,
        password: this.state.password
      }

      console.log('USER DATA to LOGIN', payload)

      let result = await requestHTTP(`${this.URI}/api/auth/login`, 'post', payload)
      console.log('ORDER login >>', result)

      if (result.status == 200) {
        this.setState({ message:  '' })
      } else {
        this.setState({ message:  result.message })
      }

    } catch (err) {
      console.log('Error login', err)
    }
  }

  handleChange(e) {
    console.log('Element selected')
    console.log(e.target.name)

    if (e.target.name === 'email') {
      this.setState({ email: e.target.value })

    } else if (e.target.name === 'password') {
      this.setState({ password: e.target.value })

    } else {
      console.log('Error')
    }
  }

  render() {
    return (
      <div className="Login">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Login__content">
          <h2>Login</h2>
              <div>
                <div className="form-group">
                <label for="email">Email</label>
                <input onChange={this.handleChange} type="email" className="form-control" name="email" aria-describedby="emailHelp" placeholder="Enter email"/>
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input onChange={this.handleChange} type="password" className="form-control" name="password" placeholder="Password"/>
              </div>
              <div>
                <button onClick={this.eventLogin} className="btn btn-primary">Entrar</button>
              </div>
              <div className="messageError">
                {this.state.message}
              </div>
            </div>
        </div>
      </div>
    )
  }
}

export default Login
