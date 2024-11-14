const asyncHandler = require("express-async-handler")
const Newsletter = require("../models/newsletterModel")

const getNewsletter = asyncHandler(async(req,res) => {
    try {
        const data = await Newsletter.find({})
        res.status(200).json(data)
    } catch (err) {
        return res.status(404).json({err: err.message})
    }
})


const createNewsletter = asyncHandler(async(req,res) => {
    const {title, author, date, imageUrl, discription} = req.body

    if(!title || !author || !date || !imageUrl || !discription){
        res.status(400)
        throw new Error("Please fill in all fields")
    }

    try{
        const newsletterExists = await Newsletter.findOne({title, author, date})
        if(newsletterExists){
            return res.status(400).json({message: "User Already Exists"})
        }

        const newsletter = await Newsletter.create({
            title,
            author, 
            date,
            imageUrl,
            discription
        })

        return res.status(201).json({message: "Newsletter Added Successfully", newsletter})
        
    } catch (error){
        return res.status(400).json({message: error.message})
    }
})


module.exports = {getNewsletter, createNewsletter}