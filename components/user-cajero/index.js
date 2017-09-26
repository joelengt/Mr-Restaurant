import React from 'react'
import stylesheet from './style.scss'
import FoodList from '../food-list'

class Cajero extends React.Component {
  constructor(props) {
    super(props)
    // This binding is necessary to make `this` work in the callback
    this.handleNextButton = this.handleNextButton.bind(this)

    this.state = { nextButton: true }
  }

  handleNextButton() {
    console.log('Event click, next')
    this.setState(prevState => ({
      nextButton: !prevState.nextButton
    }))
  }

  render() {
    return (
      <div className="Cajero">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Cajero__top">
         <div>
           <h2>Cajero - step1</h2>
         </div>
         <div>
           <p>Items: 6</p>
           <p>Total: S/36.00</p>
         </div>
        </div>
        <div className="Cajero__list">
          <div className="Cajero__list-container">
            <h2>Menu del día</h2>
            <FoodList/>
          </div>
        </div>
        <div className="Cajero__actions">
        <button type="button" className="btn btn-danger">Cancelar</button>
        <button onClick={ this.handleNextButton } type="button" className="btn btn-success">Siguiente</button>
        <p>{ this.state.nextButton ? 'ON' : 'OFF' }</p>
        </div>
      </div>
    )
  }
}

export default Cajero
