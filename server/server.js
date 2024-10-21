const express = require ("express")
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")

connectDb()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())


app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

