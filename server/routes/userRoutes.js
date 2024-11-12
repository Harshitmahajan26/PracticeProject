const express = require("express")
const router = express.Router()

const {
    userRegister,
    userLogin,
    userProfile
} = require("../controllers/userController")

const {
    generateToken,
    validateJwtToken
} = require("../middleware/jwtMiddleware")

router.post("/register",userRegister)

router.post("/login", userLogin)

router.get("/getProfile", validateJwtToken, userProfile)

module.exports = router


