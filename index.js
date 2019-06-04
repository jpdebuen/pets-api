const { server, port } = require('./src/server')

server.listen(port, () => console.log(`Example app listening to port ${port}!`))
