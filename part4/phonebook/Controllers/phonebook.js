const contactRouter = require('express').Router()
const Contact = require('../models/Contact')

contactRouter.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

contactRouter.get('/', (req, res, next) => {
  Contact.find()
    .then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})

contactRouter.get('/info', (req, res, next) => {
  Contact.find().then(phonebook => {
    let info = `<p>Phonebook has info for ${phonebook.length} people</p>`
    info += Date().toString()
    res.send(info)
  })
    .catch(error => next(error))
})

contactRouter.get('/:id', (req, res, next) => {
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

contactRouter.delete('/:id', (req, res, next) => {
  Contact.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

contactRouter.post('/', (req, res) => {
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

contactRouter.put('/:id', (req, res, next) => {
  const { id, number } = req.body
  Contact.findByIdAndUpdate(id, { number: number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedContact => {
      res.json(updatedContact)
    })
    .catch(error => next(error))
})


module.exports = contactRouter