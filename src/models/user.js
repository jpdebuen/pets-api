const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  _id: {
    type: Object
  },
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  type: {
    type: String
  },
  adress: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  age: {
    type: Number,
    minlength: 2,
    maxlength: 2
  },
  userName: {
    type: String
  },
  description: {
    type: String,
    minlength: 20,
    maxlength: 200
  },
  password: {
    type: String
  }
})

module.exports = {
  schema: userSchema,
  model: model('User', userSchema)
}
