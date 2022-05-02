const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
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
        type: String,
        required: true
    },

    stockLevel:{
        type: Number,
        default: 10
    }
})

module.exports = mongoose.model('Product', ProductSchema)