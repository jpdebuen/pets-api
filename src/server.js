const express = require('express')
const app = express()
const port = 8585
let exampleJSON = {
  message: 'Hola, Koders.'
}

app.get('/hola', (request, response) => response.json(exampleJSON))

app.listen(port, () => console.log(`Example app listening to port ${port}!`))
