import React from 'react'
import stylesheet from './style.scss'

class Login extends React.Component {
  render() {
    return (
      <div className="Login">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Login__content">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label for="email">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Entrar</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
