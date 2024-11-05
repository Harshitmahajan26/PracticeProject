const express = require ("express")
const connectDb = require("./config/dbConnection")
const errorHandler = require("./middleware/errorHandler")
const cors = require("cors")

// partials
const hbs = require("hbs")
hbs.registerPartials(__dirname + '/views/partials', function(err){}) // path to your directory

const multer = require("multer")
const upload = multer({dest: 'uploads/'}) // upload folder

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



// app.post("/profile", upload.single('avatar'), function(req,res,next){
//     console.log(req.body)

//     console.log(req.file)

//     return res.redirect("/home")
// })


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const uploads = multer({ storage: storage })

const Upload = require("./models/UploadModel")

app.post("/profile", upload.single('avatar'), async (req, res, next) => {
    try {
        const profileData = {
            username: req.body.username,
            avatar: req.file.path, // Save the file path
        };

        const newProfile = new Upload(profileData);
        await newProfile.save();

        console.log("Profile saved:", newProfile);
        res.redirect("/home");
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).send("Error saving profile.");
    }
});


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

