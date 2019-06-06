const express = require('express')
const user = require('./usecases/user')

const app = express()
const port = 8080
let exampleJSON = {
  message: 'Hola, Koders.'
}

app.use(express.json())

app.get('/hola', (request, response) => response.json(exampleJSON))

app.post('/users', (request, response) => {
  try {
    const newUserData = request.body

    const newUser = user.signUp(newUserData)

    response.json({
      success: true,
      message: 'User created successfully.',
      payload: {
        user: newUser
      }
    })
  } catch (error) {
    console.error(`Error: ${error}`)
    response.status(400)
    response.json({
      success: false,
      message: 'Could not create user',
      error: error.message
    })
  }
})

module.exports = {
  server: app,
  port
}
