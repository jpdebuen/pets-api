const express = require('express')

const user = require('../usecases/user')

const router = express.Router()

router.post('/', (request, response) => {
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

router.get('/', async (request, response) => {
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

router.get('/:id', async (request, response) => {
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

router.delete('/:id', async (request, response) => {
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

router.put('/:id', async (request, response) => {
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

module.exports = router
