const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    customerID: {
        type:String,
        required: [true, 'Please enter product name'],
    },
    cartID: {
        type:String,
        required: [true, 'Please enter product name'],
    },
    totalPrice: {
        type:String,
        required: [true]
    },
    deliveryCity: {
        type:String,
        required: [true,'Please tell us witch city to deliver the products']
    },
    deliveryStreet: {
        type:String,
        required: [true,'Please tell us witch street to deliver the products']
    },
    deliveryDate: {
        type:String,
        required: [true,'choose a day for delivery']
    },
    createdAt: {
        type:Date,
        default: Date.now()
    },
    last4DigitsOfCreditCard: {
        type:String,
        required: [true,'Please provide 4 last digits of your credit card'],
    }
})

const Delivery = mongoose.model('Delivery',deliverySchema);

module.exports = Delivery;