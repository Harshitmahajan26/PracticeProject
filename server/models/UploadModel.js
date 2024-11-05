const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    username: String,
    avatar: String, // store the path to the image file
});

module.exports = mongoose.model("Upload", uploadSchema)