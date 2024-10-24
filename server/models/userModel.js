const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            require: [true, "Please add your email"],
        },
        firstName: {
            type: String,
            require: [true, "Please add your first name"],
        },
        lastName: {
            type: String,
            require: [true, "Please add your last name"],
        },
        age: {
            type: Number,
            require: [true, "Please add your age"],
        },
        bloodGroup: {
            type: String,
            require: [true, "Please add your blood group"],
        },
        gender: {
            type: String,
            require: [true, "Please add your gender"],
        },
        phoneNumber: {
            type: Number,
            require: [true, "Please add your phone number"],
        },
        password: {
            type: String,
            require: [true, "Please add your phone number"],
        }

    }
)

module.exports = mongoose.model("User", userSchema)