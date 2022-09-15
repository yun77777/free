const express = require('express')
const app = express()

const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

const config = require('./config/key')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { User } = require('./models/User')
const { auth } = require('./middleware/auth')

// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// application/json
app.use(bodyParser.json())
app.use(cookieParser())


// process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'prod' : 'dev';
console.log('config.mongoURI -> ', config.MONGO_URI)

mongoose.connect(config.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hi'))

app.post('/api/users/register', (req, res) => {
    console.log('/register req.body -> ', req.body)

    const user = new User(req.body)
    user.save((err, user) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/api/users/login', (req, res) => {
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

app.get('/api/users/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image
    })
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "" },
        (err, user) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).send({
                success: true
            })
        })
})

app.get('/api/hello', (req,res)=>{
    res.send('/api/hello')
})

const port = 5000

app.listen(port, () => console.log('listening on port 5000'))