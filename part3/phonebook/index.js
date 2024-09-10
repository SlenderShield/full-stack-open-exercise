const express = require('express')
require('dotenv').config({ path: './' })
const cors = require('cors')
const Contact = require('./models/Contact')

var morgan = require('morgan')
morgan.token('body', req => {
  return JSON.stringify(req.body)
})

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))
app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/persons', (req, res, next) => {
  Contact.find()
    .then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/info', (req, res, next) => {
  Contact.find().then(phonebook => {
    let info = `<p>Phonebook has info for ${phonebook.length} people</p>`
    info += Date().toString()
    res.send(info)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({ error: 'Name and number are required' })
  }
  let nameExists = false
  Contact.find({}).then(result => result.some(person => person.name.toLowerCase() === name.toLowerCase() ? nameExists = true : nameExists))
  if (nameExists) {
    return res.status(422).json({ error: 'Name must be unique' })
  }
  // Create new person
  const person = Contact({
    name,
    number,
  })

  // Respond with created person
  person.save().then(() =>
    res.status(201).send(person)
  )
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id, number } = req.body
  Contact.findByIdAndUpdate(id, { number: number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})