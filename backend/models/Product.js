const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    imageURL:{
        type: String,
        required: true
    },
    
    price:{
        type: Number,
        required: true
    },

    category:{
        type: String,
        required: true
    },

    manufacturer:{
        type: Number,
        required: true
    },

    stockLevel:{
        type: Number,
        required: true
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

module.exports = mongoose.model('Product', ProductSchema)