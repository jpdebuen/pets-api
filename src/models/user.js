const { Schema, model } = require('mongoose')

// let ObjectId = model.Schema.Types.ObjectId

const userSchema = new Schema({

  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
    unique: true
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },

  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  age: {
    type: Number,
    minlength: 18
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: [
      'admin',
      'adopter'
    ]
  },
  adress: {
    type: String,
    required: true,
    maxlength: 200
  },
  phone: {
    type: String,
    required: true,
    pattern: /^[a-zA-z]{8,15}$/,
    minlength: 8,
    maxlength: 15
  }
})

module.exports = {
  schema: userSchema,
  model: model('User', userSchema)
}
