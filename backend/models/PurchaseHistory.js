const mongoose = require('mongoose')

const PurchaseHistorySchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],

    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Customer', PurchaseHistorySchema)