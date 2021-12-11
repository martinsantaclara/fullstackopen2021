import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => <h1>{course}</h1>

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
  const [part1, part2, part3] = parts
  return (
    <>
      <Part part={part1}/>
      <Part part={part2}/>
      <Part part={part3}/>
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((prev,curr)=>{
    return prev + curr.exercises
  },0)
  return (
    <p>Number of exercises {total}</p>
  )
}

function App() {
  const course = 'Half Stack application development'
  const parts = [{
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
