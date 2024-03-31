const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: String,
    gender: String,
    dateOfBirth: Date,
    country: String,
    username: {
        unique: true,
        type: String
    },
    email: {
        unique: true,
        type: String
    },
    password: String,
    balance: Schema.Types.Decimal128,
    playMoney: Schema.Types.Decimal128,
    idVerified: Number,
    partner: Number,
    pro: Number,
    emailVerified: Number,
    accountCreated: {
        type: Date,
        default: Date.now
    },
    gamblingBlock: Number,
    lvl: Number,
    xp: Number,
    nextXp: Number,
    tipAmount: Schema.Types.Decimal128,
    staffAccount: Number 

})

const User = mongoose.model('User', userSchema)
module.exports = User