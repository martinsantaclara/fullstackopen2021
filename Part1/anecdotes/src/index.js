import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({anecdote,votes}) => {
  return(
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  )
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const [index, setIndex] = useState(-1)

  const handleClick = () => {
    let select = selected
    while (select === selected) {
      select = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(select)
  }

  const handleVotes = () => {
    const newVotes = [...votes]
    newVotes[selected]+=1
    setVotes(newVotes)


    // reduce and indexOf are preferred for performance reasons according to https://www.measurethat.net/Benchmarks

    const major = newVotes.reduce((maj,curr) => {
      if (curr>maj) {maj=curr}
      return maj
    },0)
    // const major = Math.max(...newVotes)

    const ind = newVotes.indexOf(major)
    // const ind = newVotes.findIndex(vote => vote === major)

    setIndex(ind)


  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {index!==-1 && <Anecdote anecdote={anecdotes[index]} votes={votes[index]}/>}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)