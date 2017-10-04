import React from 'react'
import UserItem from '../users-item'
import stylesheet from './style.scss'
import request from 'request-promise'
import Promise from 'bluebird'
import {requestHTTP} from '../../utils'
import UserDetails from '../users-details'
import UserEdit from '../users-edit'
import UserCreate from '../users-create'

let wayView = { mainList: 'mainList', details: 'details', edit: 'edit', create: 'create' }

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'
    this.state = { userList: [], currentView: wayView.mainList, currentUserDetails: 0 }
    this.updateViewState = this.updateViewState.bind(this)
    this.updateUserDetails = this.updateUserDetails.bind(this)
    this.eventCreateForm = this.eventCreateForm.bind(this)
  }

  updateViewState (viewState) {
    this.setState(prevState => ({
      currentView: viewState
    }))
  }

  updateUserDetails (userID) {
    this.setState(prevState => ({
      currentUserDetails: userID
    }))
  }

  componentDidMount () {
    var options = {
      uri: `${this.URI}/api/users`,
      json: true
    };

    request(options)
    .then((result) => {
      console.log('Result API>>', result)

      this.setState(prevState => ({
        userList: result.data.items
      }))

    })
    .catch((err) => {
        console.log('Error API', err)
    });
  }

  getData(data) {
    let response = data.map((element) => {
      return <UserItem updateViewState={this.updateViewState} updateUserDetails={this.updateUserDetails} id={element.id} key={element.id} name={element.name} lastName={element.last_name} photo={element.photo} userAccessTitle={element.user_type_title} userAccessIcon={element.user_type_icon} userType={this.props.userType}/>
    })

    return response
  }
  
  eventCreateForm() {
    this.updateViewState(wayView.create)
  }

  render() {
    let elements = this.state.userList
    let userID = this.state.currentUserDetails

    switch (this.state.currentView) {
      case wayView.mainList:
        if (!elements.length) {
          return (<div>Cargando...</div>)
        } else {
          return (
            <div className="UserList">
              <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
              <div>
                <button onClick={ this.eventCreateForm } type="button" className="btn btn-success">New User</button>
              </div>
              <div>
                { this.getData(elements) }
              </div>
            </div>
          )
        }
        break;

      case wayView.details:
        if (!userID) {
          return <div>User Not Found</div>
        }
        return (<UserDetails id={userID} updateViewState={this.updateViewState}/>)
        break;

      case wayView.edit:
        if (!userID) {
          return <div>User Not Found</div>
        }
        return (<UserEdit id={userID}/>)
        break;

      case wayView.create:
        return (<UserCreate/>)
        break;
    }

  }
}

export default UserList
