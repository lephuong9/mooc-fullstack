import { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.handleClick}>
    {props.text}
  </button>
}

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
          <tr>{/* this creates 1 row with 2 cell */}
            <td>{props.text}</td>{/* 1st cell */}
            <td>{props.value} %</td>{/* 2nd cell */}
          </tr> 
    )
  } else return (
        <tr> 
          <td>{props.text}</td>
          <td>{props.value}</td>
        </tr> 
  )
}

{/* Can not nested table -> tbody -> tr -> td because we only need to create 1 table */}
{/* if nested all 4 here it will create multiple tables */}
{/* tr -> td is used to create row and cell */}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p> 
    )  
  } else {
    return (
      <div> 
        <table> 
          <tbody>{/* tbody have to be in table for it to work */}
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.all} />
            <StatisticLine text="average" value={props.average / props.all} />
            <StatisticLine text="positive" value={props.good / props.all * 100} />  
          </tbody> 
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1
    setGood(newGood)
    setAll(newGood + neutral + bad)
    setAverage(average + 1)
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    setAll(good + newNeutral + bad)
  }

  const handleBadClick = () => {
    const newBad = bad + 1
    setBad(newBad) 
    setAll(good + neutral + newBad)
    setAverage(average - 1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
        
    </div>
  )
}

export default App