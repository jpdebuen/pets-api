const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://pets-api:supersecreto@clusterjp-2qzlf.mongodb.net/test?retryWrites=true&w=majority'

const connect = () => new Promise((resolve, reject) => {
  mongoose.connect(connectionString, { useNewUrlParser: true }, (error) => {
    if (error) return reject(error)
    resolve()
  })
})

module.exports = {
  connect
}
