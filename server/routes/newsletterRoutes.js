const express = require("express")
const router = express.Router()

const {
    getNewsletter,
    createNewsletter
} = require("../controllers/newsletterController")

const { validateJwtToken } = require("../middleware/jwtMiddleware")


router.get("/", getNewsletter)

router.post("/", validateJwtToken, createNewsletter)

module.exports = router

