import { useState } from 'react'


const Button = (props) => {
  return <button onClick={props.handleButton}>
      {props.text}
    </button>
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]) // points is an array
  const [maxIndex, setMaxIndex] = useState(0)

  const handleNextQuote = () => { 
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
  }

  const handleVote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1 
    const maxNum = Math.max(...copyPoints) // find the maxium number in an array
    const maxIndexNum = copyPoints.indexOf(maxNum) // find the index of that max number
    setMaxIndex(maxIndexNum)
    setPoints(copyPoints)  // now points array above will become the new copyPoints
  }
  
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <p>
        <Button text="vote" handleButton={handleVote} />
        <Button text="next anecdote" handleButton={handleNextQuote} />
      </p>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
    </div>
  )
}

export default App



// SMALL ERROR LINE 107 - THIS STILL WORKS KIND OF GOOD
/* import { useState } from 'react'


const Button = (props) => {
  return <button onClick={props.handleButton}>
      {props.text}
    </button>
  
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]) // points is an array
  const [maxIndex, setMaxIndex] = useState(0)

  const handleNextQuote = () => { 
    const randomNum = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNum)
    handleMaxIndex()
  }

  const handleVote = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1 
    setPoints(copyPoints)  // now points array above will become the new copyPoints
    handleMaxIndex()  // --> sometime not working properly
  }
  // calling handleMaxIndex() right after setPoints() may not make the most upvote quote appear instantly even though the vote is higher because setPoints() is asynchronous. Fix: move all the calculation of the index of max number from handleMaxIndex() inside the handleVote(). Then instead of using points to calculate maxNum and maxIndexNum, we use copyPoints which is a local variable --> which help get the result of the calculation instantly instead of using points (useState) which in REACT when update useState it is an asynch func
  
  
  const handleMaxIndex = () => {
    const maxNum = Math.max(...points)
    const maxIndexNum = points.indexOf(maxNum)
    setMaxIndex(maxIndexNum)
  }
  
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <p>
        <Button text="vote" handleButton={handleVote} />
        <Button text="next anecdote" handleButton={handleNextQuote} />
      </p>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
    </div>
  )
}

export default App */