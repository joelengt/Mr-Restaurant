import React from 'react'
import stylesheet from './style.scss'

class Admin extends React.Component {
  render() {
    return (
      <div className="Admin">
        <style dangerouslySetInnerHTML={{__html: stylesheet}}/>
        <div className="Admin__content">
          <h2>Admin</h2>
        </div>
      </div>
    )
  }
}

export default Admin
