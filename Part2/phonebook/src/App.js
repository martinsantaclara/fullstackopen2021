import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')
  const [ filteredPersons, setFilteredPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)


  const getPersons = () => {
    personService
    .getAllPersons()
    .then(initialPersons => {
      setPersons(initialPersons)
      setFilteredPersons(initialPersons)
    })
  }

  useEffect(getPersons, [])

  const changeFilter = (event,originalPersons=persons) => {
    const searchWord = event ? event.target.value : filter
    console.log('filter ', filter)
    setFilter(searchWord)
    const newPersons = originalPersons.filter(person => person.name.toLowerCase().includes(searchWord.toLowerCase()))
    setFilteredPersons(newPersons)
  }

  const changePerson = (event) => {
    setNewName(event.target.value)
  }
  const changeNumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    
    if (!newName) {
      alert('the name must not be empty')
    } else {

      const newPerson = {
        name: newName,
        number: newNumber
      }

      const findPerson = (persons.find(person => person.name.toLowerCase() === newName.toLowerCase()))
      let newPersons
      if  (findPerson) {
        const confirmNewPerson = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if (confirmNewPerson) {
          personService
            .updatePerson(findPerson.id,newPerson)
            .then(returnedPerson => {
              setMessage(
                `Updated number of ${newName}`
              )
              setError(false)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              newPersons = persons.map(person => person.id !== findPerson.id ? person : returnedPerson)
              setPersons(newPersons)  // Updated number
              getPersons()
            })
            .catch(error => {
              setMessage(
                `Information of '${newName}' has already removed from server`
              )
              setError(true)
              setTimeout(() => {
                setMessage(null)
              }, 5000)
              getPersons()
            })
        }
      } else {
        personService
          .createPerson(newPerson)
          .then(returnedPerson  => {
            newPersons = persons.concat(returnedPerson)
            setMessage(
              `Added ${newName}`
            )
            setError(false)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(newPersons) // Added new person
            getPersons()
          })
      }
      setFilter('')
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (id,name) => {
    const confirmDeletion = window.confirm(`Delete ${name}?`)
    if (confirmDeletion) {
      personService
      .deletePerson(id)
      .then( returned => {
        const actualPersons = persons.filter(person => person.id !== id)
        console.log(actualPersons)
        setPersons(actualPersons) 
        changeFilter(null,actualPersons) 
      })
      .catch(error => {
        setMessage(
          `Information of '${name}' has already removed from server`
        )
        setError(true)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        getPersons()
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error}/>
      <Filter filter={filter} changeFilter={changeFilter}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} 
                  newName={newName} changePerson={changePerson} 
                  newNumber={newNumber} changeNumber={changeNumber} 
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App