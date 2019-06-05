const { Schema, model } = require('mongoose')

const petSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50
  },
  species: {
    type: String
  },
  breed: {
    type: String
  },
  age: {
    type: Number,
    minlength: 1
  },
  size: {
    type: Number
  },
  description: {
    type: String,
    minlength: 20,
    maxlength: 200
  },
  _id: {
    type: Object
  },
  photo: {
    type: String
  },
  status: {
    type: Boolean
  },
  userId: {
    type: String
  },
  adopterUserId: {
    type: String
  }
})

module.exports = {
  schema: petSchema,
  model: model('Pets', petSchema)
}
