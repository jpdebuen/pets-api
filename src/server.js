const express = require('express')

const app = express()
const port = 8080
let exampleJSON = {
  message: 'Hola, Koders.'
}

app.get('/hola', (request, response) => response.json(exampleJSON))

module.exports = {
  server: app,
  port
}
