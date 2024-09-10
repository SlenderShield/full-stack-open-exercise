const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogRouter')
const middleware = require('./utils/middleware')

var morgan = require('morgan')
morgan.token('body', req => {
    return JSON.stringify(req.body)
})

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })


app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app