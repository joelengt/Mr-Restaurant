import React from 'react'
import stylesheet from './style.scss'

class Header extends React.Component {
  isLogin () {
    let auth = true
    if (!auth) {
      return (
        <div></div>
      )
    }
    return (
      <div>
        <div className="name">
          <p> Joel Gonzales</p>
        </div>
        <div className="avatar">
          <img src="http://www.mujeremprendedoralac.org/dev/wp-content/uploads/2015/10/cropped-ICONOpeque%C3%B1o.png"></img>
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
              <img src="http://www.mujeremprendedoralac.org/dev/wp-content/uploads/2015/10/cropped-ICONOpeque%C3%B1o.png"/>
            </div>
            <div className="Header__container--title">
              <p>Don Restaurant</p>
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
