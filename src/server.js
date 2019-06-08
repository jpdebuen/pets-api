const express = require('express')
const usersRouter = require('./routes/users')
const petsRouter = require('./routes/pets')

const app = express()
const port = 8080

app.use(express.json())

app.use('/users', usersRouter)

app.use('/pets', petsRouter)

module.exports = {
  server: app,
  port
}
