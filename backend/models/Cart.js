const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
})

module.exports = mongoose.model('Cart', CartSchema)