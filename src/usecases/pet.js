const { model: Pet } = require('../models/pet')

const registerPet = (petData = {}) => {
  const {
    name,
    species,
    breed,
    ageInYears,
    size,
    description,
    photo,
    isAdopted,
    petId,
    adopterUserId
  } = petData
  const pet = new Pet({
    name,
    species,
    breed,
    ageInYears,
    size,
    description,
    photo,
    isAdopted,
    petId,
    adopterUserId
  })

  const error = pet.validateSync()
  if (error) throw error

  return pet.save()
}

const getAll = async () => {
  const allPets = await Pet.find().lean()
  const cleanPets = allPets.map((pet) => {
    const { password, ...cleanPet } = pet
    return cleanPet
  })
  return cleanPets
}

const getById = async (petId) => {
  const pet = await Pet.findById(petId).lean()
  if (!pet) throw new Error('There are no users with the given Id')
  const { password, ...cleanPet } = pet
  return cleanPet
}

const deleteById = (petId) => Pet.findByIdAndDelete(petId)

const updateById = (petId, petData) => Pet.findByIdAndUpdate(petId, petData)

module.exports = {
  registerPet,
  getAll,
  getById,
  deleteById,
  updateById
}
