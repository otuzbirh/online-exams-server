const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization


  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const { id } = decoded
    req.userId = id
    next()
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authMiddleware

