const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

const config = require('./config/key')

const { User } = require('./models/User')

const bodyParser = require('body-parser')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// application/json
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hi'))

app.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log('listening on port 5000'))