const User = require("../models/User");
const  asyncWrapper  = require('../middleware/async');

const { createCustomError } = require('../errors/custom-error')


const createUser = asyncWrapper( async (req, res) => {
        const user = await User.create(req.body)
        res.status(201).json({user})
})

  const listUsers = asyncWrapper( async (req, res, next) => {
    const users = await User.find({})
    res.status(200).json({ users })
  })

  const singleUser = asyncWrapper( async (req, res, next) => {
    const {id: userID} = req.params
    const user = await User.findOne({_id: userID})
    if(!user) {
        return next(createCustomError(`No user with id : ${userID}`, 404))    } 
    res.status(200).json({ user })
    
  })

  const updateUser = asyncWrapper(async (req, res, next) => {
    const {id: userID} = req.params

    const user = await User.findOneAndUpdate({_id: userID}, req.body, {
        new: true,
        runValidators: true
    })
    if (!user) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
      }
      res.status(200).json({ user })
  
  })

  

  const deleteUser = asyncWrapper( async (req, res, next) => {
    const {id: userID} = req.params
    const user  = await User.findByIdAndDelete({_id: userID})
    if (!user) {
        return next(createCustomError(`No user with id : ${userID}`, 404))
      }
      res.status(200).json({ user })
  } )
  
  module.exports = {
    createUser,
    listUsers,
    singleUser,
    deleteUser,
    updateUser
  };
  