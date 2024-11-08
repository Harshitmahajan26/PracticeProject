var jwt = require("jsonwebtoken")

const generateToken = (userData) => {
    // this function we are creating a new JWT token to provide user for Login/Session management or for authorization purpose
    return jwt.sign(userData, process.env.PRIVATE_KEY)
}

const validateJwtToken = (req, res, next) => {
    // first we are checking that JWT token in available or not
    // const authorization = req.headers.authorization

    if(!authorization){
        return res.status(401).json({err: 'Token not available'})
    }

    // we are storing the token value from headers and splitting to get "Bearer xyx" to "xyz"
    const token = req.headers.authorization.split(' ')[1]

    if(!token){
        return res.status(401).json({err: "Unauthorized User"})
    }

    try {
        const validateToken = jwt.verify(token, process.env.PRIVATE_KEY)
        req.user = validateToken
        next()
    } catch (error) {
        console.log("Error Occured". error.message)
    }

}

module.exports = {generateToken, validateJwtToken}