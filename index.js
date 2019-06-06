const { server, port } = require('./src/server')
const db = require('./src/lib/db')

db.connect()
  .then(() => {
    console.log('Database connected')
    server.listen(port, () => console.log(`Example app listening to port ${port}!`))
  })
  .catch(error => {
    console.error(`Error:  ${error}`)
  })
