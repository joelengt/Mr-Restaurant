import React from 'react'
import UserItem from '../users-item'
import stylesheet from './style.scss'
import request from 'request-promise'
import Promise from 'bluebird'
import {requestHTTP} from '../../utils'

class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'
    this.state = { userList: [] }
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
      return <UserItem id={element._id} key={element._id} name={element.name} lastName={element.last_name} photo={element.photo} userAccessTitle={element.user_type_title} userAccessIcon={element.user_type_icon} userType={this.props.userType}/>
    })

    return response
  }

  render() {
    let elements = this.state.userList

    if (!elements.length) {
      return (<div>Cargando...</div>)
    } else {
      return (
        <div className="UserList">
          <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
          { this.getData(elements) }
        </div>
      )
    }
  }
}

export default UserList
