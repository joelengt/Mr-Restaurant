import React from 'react'
import stylesheet from './style.scss'
import UserCajero from '../user-cajero'
import UserChef from '../user-chef'
import UserAdmin from '../user-admin'


let userOptions = ['cajero', 'chef', 'admin']

class Plataform extends React.Component {
  getUserView () {
    let userView = userOptions[2]

    if (userView === 'cajero') {
      return (<UserCajero/>)

    } else if (userView === 'chef') {
      return (<UserChef/>)

    } else if (userView === 'admin') {
      return (<UserAdmin/>)

    } else {
      return (
        <div className="Plataform">
          401
        </div>
      )
    }

  }

  render() {
    return this.getUserView()
  }
}

export default Plataform
