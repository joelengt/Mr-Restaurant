import React from 'react'
import stylesheet from './style.scss'
import UserList from '../../users-list'
import request from 'request-promise'
import {requestHTTP} from '../../../utils'

class Users extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.URI = 'http://localhost:3000'
    this.state = { nextButton: false }
  }

  render() {
    return (
      <div className="Users">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Users__list">
          <div className="Users__list-container">
            <h2>Users</h2>
            <UserList userType="admin"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Users
