import React from 'react'
import Layout from '../components/Layout'
import PlataformSelection from '../components/plataform'

class Plataform extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Layout title="Plataform">
        <PlataformSelection/>
      </Layout>
    )
  }
}

export default Plataform
