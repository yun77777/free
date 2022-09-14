const mongoose = require('mongoose')
const bcrpyt = require('bcrypt')
const MONGO_URI = require('../config/dev')
mongoose.connect(MONGO_URI.MONGO_URI)


const userSchema = new mongoose.Schema({
    id: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

userSchema.methods.check = async function check(user) {
    const registeredUser = await User.findOne({ id: user.id })
    if (registeredUser.length < 1) return { error: true, detail: "The user is already registered" }
    console.log('check registeredUser -> ', registeredUser)

    const result = await new Promise((rs, rj) => {
        bcrpyt.compare(user.password.toString(), registeredUser.password, function(err, result) {
            if (err) return rs({ error: true })
            return rs({ error: result ? false : true })
        })
    })

    return result
}


module.exports = { userSchema }