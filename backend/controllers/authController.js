const jwt = require('jsonwebtoken')
const User = require('../models/User')

//Function to create JWT.We pass userID as payload
const createToken = (userId) => {
  return jwt.sign(
    {id : userId},
    process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRE} 
  )
}

const register = async(req, res) => {
  try{
    const{name, email, password}=req.body

    const existingUser=await User.findOne({email})

    if(existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    const user = await User.create({name, email, password})

    const token = createToken(user._id)

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  }

  catch(error){
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

const login = async(req,res) => {
  try{
    const {email, password} = req.body

    if(!email || !password)
    {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or password'
      })
    }

    const user = await User.findOne({email})
    if(!user)
    {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch)
    {
      return res.status(400).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    //password matched.create token
    const token = createToken(user._id)
    
    res.status(200).json({
      success: true,
      token,
      user:{
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  }

  catch(error)
  {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}

module.exports = {register, login}