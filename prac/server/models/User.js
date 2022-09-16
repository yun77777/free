const mongoose = require("mongoose")

var userSchema = new mongoose.Schema({
// const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    isAuth: Number,
    isAdmin: Number,
})


userSchema.methods.hello = function hello() {
    console.log('hello')
}

const User = mongoose.model('User', userSchema)
// const moly = new User({id: 'moly', password: '12345'})
// console.log('moly -> ', moly)

// moly.hello()

module.exports = User