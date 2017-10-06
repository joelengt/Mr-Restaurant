import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'
import config from '../../config.js'

let wayView = { mainList: 'mainList', details: 'details', edit: 'edit' }

class UserItem extends React.Component {
  constructor(props) {
    super(props)
    this.URI = config.url

    this.state = { showDetails: false }
    this.eventShowDetails = this.eventShowDetails.bind(this)

    this.userType = this.props.userType
  }

  eventShowDetails() {
    // Update button click state
    this.setState(prevState => ({
      showDetails: !prevState.showDetails,
    }))

    console.log('ELEMENET ID', this.props.id)

    // Update view state
    this.props.updateViewState(wayView.details)

    // Update content
    this.props.updateUserDetails(this.props.id)
      
  }

  render() {
    return (
      <article className="Cajero__list-item">
        <div className="Cajero__list-item--cover">
          <img src={ this.props.photo }></img>
        </div>
        <div className="Cajero__list-item--details">
          <h2 className="title">
            { this.props.id } - { this.props.name } { this.props.lastName }
          </h2>
          <div>
            { this.props.userAccessIcon } - { this.props.userAccessTitle }
          </div>
          <div>
            <button onClick={ this.eventShowDetails } type="button" className="btn btn-primary">Detalles</button>
          </div>
        </div>
      </article>
    )
  }
}

export default UserItem
