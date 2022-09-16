const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const MONGO_URI = require('./config/key')
const User = require('./models/User')
const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(MONGO_URI)
    // .then(res=>console.log(res))
    .catch(err => console.log(err))

app.get('/', async(req, res) => {
    // var moly = new User({ id: 'moly', password: '12345' })
    const users = await User.find()
    console.log('users -> ', users)

    // moly.hello()
    // moly.save()

    res.send(users)
})

app.post('/register', async(req, res) => {
    console.log('req.body -> ', req.body)

    // bcrpyt password
    var user = new User({email:req.body.email, password:req.body.password})

    res.send({ error: false })
})

app.listen(port, () => console.log(`port ${port} listening on server`))