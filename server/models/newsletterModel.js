const mongoose = require("mongoose")

const newsletterSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Please add title"]
        },
        author: {
            type: String,
            required: [true, "Please add author"]
        },
        date: {
            type: String,
            required: [true, "Please add date"]
        },
        imageUrl: {
            type: Number,
            required: [true, "Please add imageUrl"]
            
        },
        discription: {
            type: String,
            required: [true, "Please add newsletter discription"]
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Newsletter", newsletterSchema)