const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

const config = require('./config/key')

const { User } = require('./models/User')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// application/json
app.use(bodyParser.json())
app.use(cookieParser())

mongoose.connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hi'))

app.post('/register', (req, res) => {
    console.log('/register req.body -> ', req.body)

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login', (req, res) => {
    console.log('/login req.body -> ', req.body)

    User.findOne({ email: req.body.email }, (err, user) => {
        console.log('User.findOne -> ', user)

        if (!user) {
            return res.json({
                loginSccess: false,
                message: "email doesn't exist"
            })
        }

        user.comparePassword(req.body.password, (err, isMatch) => {
            console.log('user.comparePassword -> ', isMatch)

            if (!isMatch)
                return res.json({ loginSuccess: false, message: "wrong password" })
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)

                // save token in cookie / localstorage / session ...
                res.cookie("x_auth", user.token)
                    .status(200)
                    .json({ loginSuccess: true, userId: user._id.toHexString() })
            })
        })
    })
})

app.listen(port, () => console.log('listening on port 5000'))