import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({handleClick,text}) => <button onClick={handleClick}>{text}</button>

const Statistic = ({text,value,percent}) => {

  return (
    <tr>
      <td>{text}</td>
      <td>{value} {percent}</td>
    </tr>
  )

}

const Statistics = ({good,neutral,bad,total,average,positive}) => {
  if (total===0) {
    return  <p>No feedback given</p>
  }

  return (
    <table>
      <Statistic text="good" value={good} percent=""/>
      <Statistic text="neutral" value={neutral} percent=""/>
      <Statistic text="bad" value={bad} percent=""/>
      <Statistic text="all" value={total} percent=""/>
      <Statistic text="average" value={average} percent=""/>
      <Statistic text="positive" value={positive} percent="%"/>
    </table>
  ) 
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = () => setGood(good+1)
  const setToNeutral = () => setNeutral(neutral+1)
  const setToBad = () => setBad(bad+1)

  const total = good + neutral + bad    
  const average = total!==0 ? (good-bad)/total : 0
  const positive = (total!==0 ? good/total : 0) * 100
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setToGood} text="good"/>
      <Button handleClick={setToNeutral} text="neutral"/>
      <Button handleClick={setToBad} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)