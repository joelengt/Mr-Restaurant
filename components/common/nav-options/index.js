import React from 'react'
import stylesheet from './style.scss'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.data = props.options
    this.state = {info: props.options[0].description}

    // This binding is necessary to make `this` work in the callback
    this.handleStateClick = this.handleStateClick.bind(this)
  }

  handleStateClick(i, event) {
    // event.currentTarget.style.backgroundColor = '#ccc';

    this.setState({
      info: this.data[i].description
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
          <p>{ this.state.info }</p>
        </div>
      </div>
    )
  }
}

export default Index
