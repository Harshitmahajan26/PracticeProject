const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const Doctors = require("../models/doctorDetailsModel")
require("dotenv").config()


const doctorRegister = asyncHandler(async (req,res) => {
    const { name, email, speciality, phoneNumber, experience, address } = req.body

    if(!name || !email || !speciality || !phoneNumber || !experience || !address){
        res.status(400)
        throw new Error("Please provide all fields")
    }

    const doctorExists = await Doctors.findOne({email})
    if(doctorExists){
        return res.status(400).json({message: "Doctor Already Exists"})
    }

    // const salt = await bcrypt.genSalt(10)
    // const hashedPassword = await bcrypt.hash(password, salt)

    const doctor = await Doctors.create({
        name,
        email,
        speciality,
        phoneNumber,
        experience,
        address
    })

    res.status(201).json({message: "Doctor Registered Successfully", doctor})


})


const getAllDoctors = asyncHandler(async (req, res) => {
    const doctors = await Doctors.find({});
    res.status(200).json(doctors);
});


module.exports = { doctorRegister , getAllDoctors }