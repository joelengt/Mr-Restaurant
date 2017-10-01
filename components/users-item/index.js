import React from 'react'
import stylesheet from './style.scss'
import Link from 'next/link'
import _ from 'lodash'
import {requestHTTP} from '../../utils'

class UserItem extends React.Component {
  constructor(props) {
    super(props)
    this.URI = 'http://localhost:3000'

    this.state = { showDetails: false }
    this.eventShowDetails = this.eventShowDetails.bind(this)

    this.userType = this.props.userType
  }

  eventShowDetails() {
    this.setState(prevState => ({
      showDetails: !prevState.showDetails
    }))
  }

  render() {
    return (
      <article className="Cajero__list-item">
        <div className="Cajero__list-item--cover">
          <img src={ this.props.photo }></img>
        </div>
        <div className="Cajero__list-item--details">
          <h2 className="title">
            { this.props.name } { this.props.lastName }
          </h2>
          <div>
            { this.props.userAccessIcon } - { this.props.userAccessTitle }
          </div>
          <div>
            <button onClick={ this.eventShowDetails } type="button" className="btn btn-primary">Detalles</button>
            <p>Click: { this.state.showDetails ? 'ON': 'OFF' }</p>
          </div>
        </div>
      </article>
    )
  }
}

export default UserItem
