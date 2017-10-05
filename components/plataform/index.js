import React from 'react'
import stylesheet from './style.scss'
import UserCajero from '../user-cajero'
import UserChef from '../user-chef'
import UserAdmin from '../user-admin'

let userOptions = {
  admin: 1,
  cajero: 2,
  chef: 3
}

class Plataform extends React.Component {

  getUserView () {
    let userView = this.props.userAccess

    if (userView === userOptions.cajero) {
      return (<UserCajero/>)

    } else if (userView === userOptions.chef) {
      return (<UserChef/>)

    } else if (userView === userOptions.admin) {
      return (<UserAdmin/>)

    } else {
      return (
        <div className="Plataform">
          401 - Ud No tiene acceso
        </div>
      )
    }

  }

  render() {
    return this.getUserView()
  }
}

export default Plataform
