const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema ({
    
    title : String,
    descreption: String,
    category : String,
    price : String,
    images : [],
    location : String
})

mongoose.model("list",ListSchema)