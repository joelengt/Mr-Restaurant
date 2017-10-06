import React from 'react'
import Layout from '../components/Layout'
import Login from '../components/login'
import config from '../config.js'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { auth: false, name: {} }
    this.setAuthUser = this.setAuthUser.bind(this)
    this.URI = config.url
  }

  setAuthUser(state, user) {
  	this.setState({auth: state})
  	this.setState({name: user})
  }

  render() {
    return (
      <Layout title="Login" auth={this.state.auth} userAuth={this.state.name}>
        <Login currentUserAuth={this.setAuthUser}/>
      </Layout>
    )
  }
}

export default Index
