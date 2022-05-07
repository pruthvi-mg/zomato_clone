const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    placedBy: {
        type: String
      
    },
    placedByUserId: {
        type: String
      
    },
    placedOn: {
        type: String
      
    },
    address: {
        type: String
      
    },
    items: {
        type: Array
      
    },
    amount: {
        type: Number
      
    },
    restaurantId: {
        type: String
      
    },
    contactNumber: {
        type: Number
      
    },
    restaurantName :{
        type : String

    }
})

module.exports = mongoose.model('order', ordersSchema, 'order');

