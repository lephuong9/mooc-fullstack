import { useEffect, useState } from 'react'
import axios from 'axios'
import personServices from "./services/persons.js"
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='added'>
      {message}
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      <div>
        filter shown with <input value={props.filterName} onChange={props.handleFilterName}/>
      </div>
    </div>
  )
}

// the onChange is triggered whenever users type into the input field (no need to click button)
// the onClick onSubmit 'addPerson' is triggered whenever users click button

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNewNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNewNumberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  )
}


const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map((person) => {
        return (
          <div key={person.id}>
            {person.name} {person.number}
            <button onClick={() => {props.deletePerson(person.id, person.name)}}>delete</button> 
          </div> // because deletePerson accept an argument 'id' so in onClick use () => {} 
        )         // the argument person.name is added because I need to access the name when the
                  // window.confirm pop up to ask if you want to delete ${person.name}
      })}  
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterName, setFilterName] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)


  useEffect(() => {
    personServices
      .getAll()  
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  

  const addPerson = (event) => {
    event.preventDefault() // use this when there's actions that make page refresh like submit form

    let nameExist = false
    let changePerson

    persons.forEach((person) => {
      if (person.name === newName) {
        nameExist = true
        changePerson = {...person, number : newNumber}
      }
    })

    if (!nameExist) {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setAddedMessage(`Added ${newPerson.name}`)
          setTimeout(() => {          
            setAddedMessage(null)        
          }, 5000)                // Added message disappear after 5 seconds.
        })  

    } else {
      if (window.confirm(`${changePerson.name} is already added to the phonebook, replace the old number with a new one?`)) { // if user click ok to the .confirm pop up, then we do the below
        personServices
          .updateNumber(changePerson.id, changePerson)
          .then((returnedPerson) => {
            setPersons(persons.map(person => person.id !== changePerson.id ? person : returnedPerson))
          })
          .catch(error => {
            alert("Something wrong happen, please try again.")
          })
      } // leave the else blank if user click cancel -> nothing happen.
    }
  }


  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  } //updates the newName state with the current value of the input field.
    // there's no preventDefault() because users only typing in the input field, there's no action from users that make the page refresh.


  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilterName = (event) => {
    setFilterName(event.target.value)
    setShowAll(false)
  }


  // if true then use the origin persons list, else use the filter list
  const personsToShow = showAll 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    //(person => person.name.toLowerCase() === filterName.toLowerCase())
    // this only return the fullname so users must type full name to filter that's why use 'includes' to help searching for substring.



  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      axios.delete(`http://localhost:3001/persons/${id}`)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert('Information of ${name} has already been removed from server')
        });
    }
  };



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedMessage} />
      <Filter filterName={filterName} 
              handleFilterName={handleFilterName} 
              />

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber}
                  handleNewNameChange={handleNewNameChange} 
                  handleNewNumberChange={handleNewNumberChange} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />

    </div>
  ) 
}

export default App