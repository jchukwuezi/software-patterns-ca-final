const express = require('express')
const cors = require('cors')
const session = require('express-session')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

//load config
dotenv.config({path: './config/config.env'})

connectDB()
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.listen(4000, ()=>{
    console.log('Server has started')
})