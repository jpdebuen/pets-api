const express = require('express')

const user = require('../usecases/user')
const auth = require('../middlewares/auth')

const router = express.Router()

router.post('/', auth, (request, response) => {
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

router.get('/', auth, async (request, response) => {
  try {
    const allUsers = await user.getAll()
    response.json({
      success: true,
      message: 'All users',
      payload: {
        users: allUsers
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(400)
    response.json({
      success: false,
      message: 'Could not get users.',
      error: error.message
    })
  }
})

router.get('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const foundUser = await user.getById(id)
    response.json({
      success: true,
      message: 'User found.',
      payload: {
        user: foundUser
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(404)
    response.json({
      success: false,
      message: 'User not found.',
      error: error.message
    })
  }
})

router.delete('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const deletedUser = await user.deleteById(id)
    response.json({
      success: true,
      message: 'User deleted.',
      payload: {
        user: deletedUser
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(400)
    response.json({
      success: false,
      message: 'Could not delete user.',
      error: error.message
    })
  }
})

router.put('/:id', auth, async (request, response) => {
  try {
    const { id } = request.params
    const newUserData = request.body
    const updatedUser = await user.updateById(id, newUserData)
    response.json({
      success: true,
      message: 'User updated.',
      payload: {
        user: updatedUser
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(400)
    response.json({
      success: false,
      message: 'Unable to update user.',
      error: error.message
    })
  }
})

router.post('/auth', async (request, response) => {
  try {
    const {
      password,
      email
    } = request.body

    const token = await user.login(email, password)
    response.json({
      success: true,
      message: 'Login successful',
      payload: {
        token
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(401)
    response.json({
      success: false,
      message: 'Login failed.',
      error: error.message
    })
  }
})

module.exports = router
