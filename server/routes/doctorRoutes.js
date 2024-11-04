const express = require("express")
const router = express.Router()

const {
    doctorRegister,
    getAllDoctors
    // loginUser
} = require("../controllers/doctorController")

router.get("/", getAllDoctors)

router.post("/register", doctorRegister)

// router.post("/login", loginUser)

module.exports = router

