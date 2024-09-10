const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const contactRouter = require('./Controllers/phonebook')
const mongoose = require('mongoose')

var morgan = require('morgan')
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

mongoose.set('strictQuery', false)

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))

app.use('/api/persons', contactRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app