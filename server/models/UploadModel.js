const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    avatar:
    {
        fileName: String,
        filePath: String
    }
});

module.exports = mongoose.model("Upload", uploadSchema)