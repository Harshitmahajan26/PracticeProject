const express = require ("express")
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")

// partials
const hbs = require("hbs")
hbs.registerPartials(__dirname + '/views/partials', function(err){}) // path to your directory

// env file config
const dotenv = require("dotenv")
dotenv.config()

connectDb()
const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use("/api/user", require("./routes/userRoutes"))


app.use("/api/doctor", require("./routes/doctorRoutes"))

// app.post("/api",(req,res)=>{
//     const {name}=req.body
//     res.send(name)
// })




app.get("/", (req,res)=>{
    res.send("Hello World")
})

app.set('view engine', 'hbs')



app.get("/home", (req,res) => {
    res.render("home", {
        username: "Harshit",
        hosts: "Whats up brother"
    })
})

app.get("/users", (req, res) => {
    const users = [
        { username: "Harshit", hosts: "What's up brother" },
        { username: "Alice", hosts: "Hello Alice!" },
        { username: "Bob", hosts: "Hey Bob!" }
    ];

    res.render("users", { users });
});




app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

