const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')

require('dotenv').config()
const logger = require('morgan')

const app = express()

const {
    SESSION_SECRET,
    SERVER_PORT,
    SERVER_HOST
} = process.env

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

const hbs = exphbs.create({
    extname: '.hbs'
})
app.engine('.hbs', hbs.engine)
app.set('view engine', '.hbs')
app.use(flash())
app.set(express.static('public'))

app.use(logger('dev'))

const conn = require('./config/conn')
const connectDB = async () => {
    try {
        await conn.authenticate()
        console.log('db connected successfully..')
    } catch (err) {
        console.log(`db connection error: ${err.message}`)
    }
}
connectDB()

app.listen(SERVER_PORT, () => console.log(`started on: http://${SERVER_HOST}:${SERVER_PORT}`))