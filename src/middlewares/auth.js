const user = require('../usecases/user')

const auth = (request, response, next) => {
  try {
    const {
      authorization
    } = request.headers
    if (!authorization) throw new Error('Authorization header not present.')
    console.log('headers', authorization)
    const jwtDecoded = user.verifyJwt(authorization)
    console.log('jwtDecoded', jwtDecoded)
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'Token required.',
      error: 'Authorization header required.'
    })
  }

  next()
}

module.exports = auth
