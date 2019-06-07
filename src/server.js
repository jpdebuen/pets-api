const express = require('express')
const usersRouter = require('./routes/users')

const app = express()
const port = 8080

app.use(express.json())

app.use('/users', usersRouter)

module.exports = {
  server: app,
  port
}
