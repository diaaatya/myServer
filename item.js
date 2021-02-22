const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema ({
    title : String,
    email: String,
    category : String,
    price : String
})

mongoose.model("items",ItemSchema)