const express = require("express")
const router = express.Router()

const {
    userRegister,
    loginUser
} = require("../controllers/userController")

router.post("/register", userRegister)

// router.post("/login", loginUser)

module.exports = router

