const { model: User } = require('../models/user')

const signUp = (userData = {}) => {
  const {
    email,
    name,
    lastName,
    age,
    password,
    type,
    adress,
    phone
  } = userData

  const user = new User({
    email,
    name,
    lastName,
    age,
    password,
    type,
    adress,
    phone
  })

  const error = user.validateSync()
  if (error) throw error

  return user.save()
}

const getAll = async () => {
  const allUsers = await User.find().lean()
  const cleanUsers = allUsers.map((user) => {
    const { password, ...cleanUser } = user
    return cleanUser
  })
  return cleanUsers
}

const getById = async (userId) => {
  const user = await User.findById(userId).lean()
  if (!user) throw new Error('There are no users with the given Id')
  const { password, ...cleanUser } = user
  return cleanUser
}

const deleteById = (userId) => User.findByIdAndDelete(userId)

const updateById = (userId, userData) => User.findByIdAndUpdate(userId, userData)

module.exports = {
  signUp,
  getAll,
  getById,
  deleteById,
  updateById
}
