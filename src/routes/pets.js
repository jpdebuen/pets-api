const express = require('express')

const pet = require('../usecases/pet')

const router = express.Router()

router.post('/', (request, response) => {
  try {
    const newPetData = request.body

    const newPet = pet.registerPet(newPetData)

    response.json({
      success: true,
      message: 'Pet registered successfully.',
      payload: {
        pet: newPet
      }
    })
  } catch (error) {
    console.error(`Error: ${error}`)
    response.status(400)
    response.json({
      success: false,
      message: 'Could not register pet',
      error: error.message
    })
  }
})

router.get('/', async (request, response) => {
  try {
    const allPets = await pet.getAll()
    response.json({
      success: true,
      message: 'All pets',
      payload: {
        pets: allPets
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(400)
    response.json({
      success: false,
      message: 'Could not get pets.',
      error: error.message
    })
  }
})

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const foundPet = await pet.getById(id)
    response.json({
      success: true,
      message: 'Pet found.',
      payload: {
        pet: foundPet
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(404)
    response.json({
      success: false,
      message: 'Pet not found.',
      error: error.message
    })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const deletedPet = await pet.deleteById(id)
    response.json({
      success: true,
      message: 'Pet deleted.',
      payload: {
        pet: deletedPet
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(400)
    response.json({
      success: false,
      message: 'Could not delete pet.',
      error: error.message
    })
  }
})

router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const newPetData = request.body
    const updatedPet = await pet.updateById(id, newPetData)
    response.json({
      success: true,
      message: 'Pet updated.',
      payload: {
        pet: updatedPet
      }
    })
  } catch (error) {
    console.error('Error: ', error)
    response.status(400)
    response.json({
      success: false,
      message: 'Unable to update pet.',
      error: error.message
    })
  }
})

module.exports = router
