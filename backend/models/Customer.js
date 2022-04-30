const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    
    username:{
        type: String, 
        required: true
    },

    address:{
        type: String, 
        required: true
    },

    password:{
        type: String,
        required: true
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

module.exports = mongoose.model('Customer', CustomerSchema)