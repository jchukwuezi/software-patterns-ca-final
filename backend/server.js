const express = require('express')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const MAX_AGE = 1000 * 60 * 60 * 3; //three hours


//load config
dotenv.config({path: './config/config.env'})

//declaring routes
const Customers = require('./routes/api/customers')
const Admins = require('./routes/api/admins')
const Products = require('./routes/api/products')
const Reviews = require('./routes/api/reviews')
const PurchaseHistories = require('./routes/api/purchasehistory')

connectDB()
const app = express();

//setting connect-mongo-db-session to store sessions in the database
const mongoDBstore = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: "sessions"
})

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(session({
    name: process.env.COOKIE_NAME,
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: mongoDBstore,
    cookie:{
        maxAge: MAX_AGE,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production'
    }
}))

app.use("/api/customers", Customers)
app.use("/api/admins", Admins)
app.use("/api/products", Products)
app.use("/api/purchasehistories", PurchaseHistories)
app.use("/api/reviews", Reviews)

app.listen(4000, ()=>{
    console.log('Server has started')
})