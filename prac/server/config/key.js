let MONGO_URI = ''

if (process.env.NODE_ENV === 'production') {
    MONGO_URI = require('./prod').MONGO_URI
} else {
    MONGO_URI = require('./dev').MONGO_URI
}

module.exports = MONGO_URI