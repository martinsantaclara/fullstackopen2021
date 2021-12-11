import React, {useState} from 'react';
import ReactDOM from 'react-dom';

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
      <button onClick={setToGood}>good</button>
      <button onClick={setToNeutral}>neutral</button>
      <button onClick={setToBad}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)