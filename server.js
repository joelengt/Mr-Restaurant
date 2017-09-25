const express = require('express')
const next = require('next')
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const port = process.env.PORT || 5000

app.prepare()
  .then(() => {
    const server = express()

    server.get('/fruit/:id', (req, res) => {
      let params = req.params
      let query = req.query

      console.log('params', params)
      console.log('query', query)

      return app.render(req, res, '/fruit-item', Object.assign(params, query))
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`Server start on ${port}`)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
