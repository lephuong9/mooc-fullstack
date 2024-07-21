const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.json())

let morgan = require('morgan')

morgan.token('info', (req, res) => { // 'info' can be named anything
  const person = {
    "name" : req.body.name,
    "number" : req.body.number
  }
  return JSON.stringify(person)
});

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'));





let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
  const timeAndDate = new Date()
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p>
     <p>${timeAndDate}</p>    
    `
  )
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// this log only show in powershell/CML, put this in the send or post request to appear in website log
// const now = new Date();
// console.log(now);  // Outputs the current date and time



app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})



app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})



app.post('/api/persons', (request, response) => {
  const body = request.body //the request.body is the object in create_new_person.rest file
  const matchedPerson = persons.find(p => p.name === body.name)
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  } else if (matchedPerson) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: Math.floor(Math.random()*100000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})




const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

