import React from 'react'
import stylesheet from './style.scss'
import OrderView from '../orders'
import Users from '../users'
import MenuFood from '../menu-food'
import config from '../../../config.js'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.data = props.options
    this.state = {info: <OrderView/>}

    // This binding is necessary to make `this` work in the callback
    this.handleStateClick = this.handleStateClick.bind(this)
  }

  handleStateClick(i, event) {
    let result

    switch (this.props.options[i].id) {
      case '0':
        result = (<OrderView/>)
        break;

      case '1':
        result = (<MenuFood/>)
        break;

      case '2':
        result = (<Users/>)
        break;

      default:
        result = (
          <div>
            <h2>Error</h2>
          </div>
        )
    }

    this.setState({
      info: result
    })

  }

  getOptions () {
    let options = this.data
    let template = options.map((element) => {
      return (
        <li key={element.id} onClick={ this.handleStateClick.bind(this, element.id) }>
         {element.name}
        </li>
      )
    })
    return template
  }

  render() {
    return (
      <div>
        <nav className="options">
          <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
          <ul>
          { this.getOptions() }
          </ul>
        </nav>
        <div>
          { this.state.info }
        </div>
      </div>
    )
  }
}

export default Index
