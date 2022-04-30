const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema({
    body:{
        type: String,
        required: true
    },
    
    rating:{
        type: Number, 
        required: true
    },

    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customer', ReviewSchema)