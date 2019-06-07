const { Schema, model } = require('mongoose')

// let ObjectId = model.Schema.Types.ObjectId

const petSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  species: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    pattern: /^[a-zA-Z]{2,50}$/
  },
  ageInYears: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 1000
  },
  size: {
    type: Number,
    enum: [
      'small',
      'medium',
      'large'
    ],
    required: true
  },
  description: {
    type: String,
    required: false,
    maxlength: 300
  },
  photo: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 300
  },
  isAdopted: {
    type: Boolean,
    default: false
  },
  userId: {
    type: String,
    required: true
  },
  adopterUserId: {
    type: String,
    required: false
  }
})

module.exports = {
  schema: petSchema,
  model: model('Pets', petSchema)
}
