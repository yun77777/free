const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config()

mongoose.connect(`mongodb+srv://${process.env.DB_ID}:${process.env.DB_PW}@freecluster.u5jqszg.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    }).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

app.get('/', (req, res) => res.send('hi'))

app.listen(port, () => console.log('listening on port 5000'))