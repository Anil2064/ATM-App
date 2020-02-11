'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ATMSchema = new Schema({
    user_card: {
        type: Number,
        required: true,
        unique: true
    },
    pin: {
        type: Number,
        required: true
    },
    money: {
        type: Number
    }
})

module.exports = mongoose.model('ATM', ATMSchema);