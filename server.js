require('dotenv').config()

const Parse = require('parse/node')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

//PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
Parse.initialize("lE1wPXTDJZsKM6EexdwmQePTmVaXSKO7Yku7uudO","LwHSSARiJX34CB5VOM94HYEbkZynBOdr9qxISwqp")
Parse.serverURL = 'https://parseapi.back4app.com/'

const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database.'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server started at port', port))
