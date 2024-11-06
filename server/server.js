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
app.use("/uploads", express.static("uploads"));
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
            avatar: {
                fileName: req.file.filename, // Use req.file.filename for file name
                filePath: req.file.path,     // Use req.file.path for file path
            },
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

app.get("/getPhotos", async (req, res) => {
    try {
        // Assuming Upload is a model for your database
        const uploads = await Upload.find(); // Fetch all uploaded photos from the database
        res.render("users", { uploads }); // Pass the photos to the template

    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching photos");
    }
});


    // res.json("hello")
    // Upload.forEach(element => {
    //     const photo = avatar.filePath
    //     res.send(photo)
    // });




app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

