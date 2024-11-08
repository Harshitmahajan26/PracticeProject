const express = require("express")
const router = express.Router()

const {
    userRegister,
    userLogin
} = require("../controllers/userController")

const {
    generateToken,
    validateJwtToken
} = require("../middleware/jwtMiddleware")

router.post("/register",userRegister)



router.post("/login", userLogin)

// router.post("/login", loginUser)

module.exports = router

