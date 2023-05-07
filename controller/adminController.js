const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin')

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email,  password } = req.body;

  const notInput = !name || !email || !password;
  
  if(notInput) {
    res.status(422)
    throw new Error('Please add all fields')
  }
  
  //Check if user exists 
  const adminExists = await Admin.findOne({email})

  if(adminExists) {
    res.status(422)
    throw new Error('Admin email already exists')
  }

  //Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  //create admin
  const admin = await Admin.create({
    name, 
    email, 
    password: hashedPassword
  })

  if (admin) {
    res.status(201).json({
      _id: admin.id, 
      name: admin.name, 
      email: admin.email, 
      token: generateToken(admin._id)
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

})

const loginAdmin = asyncHandler (async (req,res) => {
  const {email, password } = req.body;

  //Check for user email
  const admin = await Admin.findOne({ email })

  if(admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      name: admin.name,
      email: admin.email,
      token: generateToken(admin._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

  // Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


module.exports = {
  registerAdmin,
  loginAdmin

}