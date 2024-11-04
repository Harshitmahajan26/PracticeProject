const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
require("dotenv").config()


const userRegister = asyncHandler(async (req,res) => {
    const { email, firstName, lastName, age, bloodGroup, gender, phoneNumber, password } = req.body

    if(!firstName || !lastName || !age || !bloodGroup || !gender|| !email || !password || !phoneNumber){
        res.status(400)
        throw new Error("Please provide all fields")
    }

    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({message: "User Already Exists"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        email,
        firstName,
        lastName,
        age,
        bloodGroup,
        gender,
        phoneNumber,
        password: hashedPassword
    })

    res.status(201).json({message: "User Registered Successfully", user})


})

module.exports = { userRegister }