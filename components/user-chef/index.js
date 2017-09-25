import React from 'react'
import stylesheet from './style.scss'

class Chef extends React.Component {
  render() {
    return (
      <div className="Chef">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Chef__content">
          <h2>Chef</h2>
        </div>
      </div>
    )
  }
}

export default Chef
