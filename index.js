const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
    // const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const saltRounds = 10
const app = express()
const port = 7777

const { userSchema } = require('./models/user')
const User = mongoose.model('User', userSchema)

const { auth } = require('./routes/auth')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', async(req, res) => {
    res.send({ error: false })

})

app.get('/api/users/all', async(req, res) => {
    const users = await User.find()
    res.send({ error: false, users: users })

})

app.post('/api/users/register', async(req, res) => {
    // check if there is an user with the same id
    const exist = await User.find({ "id": req.body.id })
    console.log('exist -> ', exist)
    if (exist.length > 0) return res.send({ error: true, detail: "This user is already registered" })

    // hash a password
    bcrypt.genSalt(saltRounds, function(err, salt) {
        console.log('salt -> ', salt)

        bcrypt.hash(req.body.password.toString(), salt, async function(err, hash) {
            console.log('hash -> ', hash)

            // store hash in DB
            const user = new User({ id: req.body.id, password: hash })
            const saved = await user.save()
            console.log('saved -> ', saved)

            return res.send({ error: false, saved: saved })

        })
    })
})

app.post('/api/users/login', auth, (req, res) => {
    // check the user's id & password
    // if the user information is correct, give a token to the user

    if (req.error) return res.send({ error: true, detail: "Failed to login" })

    return res.send({ error: false, detail: "Successed to Login" })


})

app.get('/api/users/logout', auth, (req, res) => {
    // check the user's id & password
    // if the user information is correct, remove the token of the user from the DB
})

app.listen(port, (req, res) => {
    console.log(`port ${port} listening on server`)
})

/*
    1. 회원가입
        mongoose: mongoDB 연동 nodejs library
        클라이언트로부터 유저정보 입력 받음 body-parser 서버 전달
        mongoDB userSchema 생성 후 유저 데이터 저장

    2. 로그인
        userSchema에 있는 유저 정보와 클라이언트로부터 입력 받은 유저 정보(아이디, 비밀번호) 비교
        유저 정보가 일치할 경우 jwt(json web token)토큰 발행 후 서버 DB & 클라이언트 쿠키에 저장
    
    3. 로그아웃
        유저 토큰 정보 서버 DB에서 제거
*/