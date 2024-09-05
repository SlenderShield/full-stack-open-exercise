const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
morgan.token('body', req => {
    return JSON.stringify(req.body)
})


let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(morgan(':method :url :status :res[content-length] :body - :response-time ms'))
app.get('/', (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.get('/api/persons', (req, res) => {
    res.json(phonebook)
})

app.get('/api/info', (req, res) => {
    let info = `<p>Phonebook has info for ${phonebook.length} people</p>`
    info += Date().toString();
    res.send(info)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id + 1);
    const person = phonebook.find(person => person.id === id);
    if (person)
        res.json(person)
    else
        res.status(404).send("Info not found")
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    const person = phonebook.find(person => person.id === id)
    if (person) {
        phonebook = phonebook.filter(persn => persn.id !== id)
        res.status(201).json(person);
    } else {
        res.status(404).send({
            error: 'Person not found'
        });
    }
})

const generateId = () => Math.floor(Math.random() * 1000);

app.post('/api/persons', (req, res) => {
    const { name, number } = req.body

    if (!name || !number) {
        return res.status(400).json({ error: 'Name and number are required' });
    }

    const nameExists = phonebook.some(person => person.name.toLowerCase() === name.toLowerCase());
    if (nameExists) {
        return res.status(422).json({ error: 'Name must be unique' });
    }
    // Create new person
    const person = {
        name,
        number,
        id: generateId()
    };

    // Add person to phonebook
    phonebook = phonebook.concat(person);

    // Respond with created person
    res.status(201).send(person);
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})