const { userSchema } = require('../models/user')
const auth = async(req, res, next) => {
    console.log('auth req.body -> ', req.body)
        // req.hello = 'oo'

    // authenticate users
    // check if the token is effective or not
    const result = await userSchema.methods.check(req.body)
    req.error = result.error
    next()
}

module.exports = { auth }