import React from 'react'
import stylesheet from './style.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  isLogin () {
    let auth = this.props.auth
    if (!auth) {
      return (
        <div></div>
      )
    }

    console.log('USER HEADER', this.props.userAuth)
    return (
      <div>
        <div className="name">
          <a href="/">Salir</a>
        </div>
        <div className="name">
          <p>{this.props.userAuth.name}</p>
        </div>
        <div className="avatar">
          <img src={this.props.userAuth.avatar || '/static/images/User-Profile.png'}></img>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Header__container  row">
          <div className="Header__container--logotipo  col">
            <div className="Header__container--logo">
              <img src="/static/images/Twemoji_1f35c.png"/>
            </div>
            <div className="Header__container--title">
              <p>Mr Restaurant</p>
            </div>
          </div>
          <div className="Header__container--user  col">
            { this.isLogin() }
          </div>
        </div>
      </div>
    )
  }
}

export default Header
