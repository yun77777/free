const express = require('express')
const app = express()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    console.log('hello')
    res.send({error:false})
})

app.get('/api/img', (req, res) =>{
    const img='zzz'
    console.log('img')
    res.send({error:false, img:img})
})

app.listen(port, () => console.log(`port ${port} listening on server`))