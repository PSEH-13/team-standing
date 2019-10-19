const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const teamStanding = require('../api/team-standing')

const start = (options) => {
  return new Promise((resolve, reject) => {
    // verify if we have a server port
    if (!options.port) {
      reject(new Error('The server must be started with an available port'))
    }

    // init express app, and add middlewares
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err:' + err))
      res.status(500).send('Something went wrong!')
    })
    
    // add micro service API
    teamStanding(app, options)
    
    // start the server, and return it
    const server = app.listen(options.port, () => {
        console.log('Server started on: ' + options.port)
        resolve(server)
    })
  })
}

module.exports = Object.assign({}, {start})