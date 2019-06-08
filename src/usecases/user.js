const jwt = require('jsonwebtoken')

const { model: User } = require('../models/user')
const bcrypt = require('../lib/bcrypt')

const signUp = async (userData = {}) => {
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

  const hash = await bcrypt.hash(password)

  const user = new User({
    email,
    name,
    lastName,
    age,
    password: hash,
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

const login = async (email, password) => {
  const user = await User.findOne({ email }).lean()
  if (!user) throw new Error(`Invalid credentials.`)

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) throw new Error('Invalid credentials.')

  return jwt.sign({ id: user._id }, 'evenmoresupersecretword', { expiresIn: '1d' })
}

const verifyJwt = token => jwt.verify(token, 'evenmoresupersecretword')

module.exports = {
  signUp,
  getAll,
  getById,
  deleteById,
  updateById,
  login,
  verifyJwt
}
