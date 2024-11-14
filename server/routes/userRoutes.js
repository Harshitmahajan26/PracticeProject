const express = require("express")
const router = express.Router()

const {
    userRegister,
    userLogin,
    userProfile,
    updateUserProfile
} = require("../controllers/userController")

const {
    generateToken,
    validateJwtToken
} = require("../middleware/jwtMiddleware")
const { JsonWebTokenError } = require("jsonwebtoken")

router.post("/register",userRegister)

router.post("/login", userLogin)

router.get("/getProfile", validateJwtToken, userProfile)

router.put("/getProfile", validateJwtToken, updateUserProfile) 

// router.post("/updateProfile", updateUserProfile)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               

module.exports = router


