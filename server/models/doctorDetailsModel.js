const mongoose = require("mongoose")

const doctorDetailsSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        speciality: {
            type: String,
        },
        phoneNumber: {
            type: Number,
        },
        experience: {
            type: String,
        },
        address: {
            type: String,
        }

    }
)

module.exports = mongoose.model("Doctors", doctorDetailsSchema)