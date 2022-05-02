const mongoose = require('mongoose')

const PurchaseHistorySchema = new mongoose.Schema({
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer"
    },

    items: [
    {
        productId:{type: String},
        name: {type: String},
        quantity:{
            type: Number,
            required: true,
            min: [1, 'Quantity cannot be less than 1.'],
            default: 1
        },
        price: {type: Number}
    }],
        
    bill:{
        type: Number,
        required: true,
        default: 0
    }, 

    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('PurchaseHistory', PurchaseHistorySchema)