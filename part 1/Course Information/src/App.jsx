const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}  
      </p>
    </div>
  ) // the 'part' and 'exercises' after props. is just like a variable (can be named whatever you want)
} 

//    Part part = {props.part1} exercises = {props.exercises1}
// this part ^ must be the same name in the Part component above after props.part <-- (this part)
const Content = (props) => {
  return (
    <div>
      <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises}/> 
      <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
      <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
    </div>
  ) // the name after props. is kind of like a variable -> 'parts' (can be any name)
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
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
      }
    ]
  }

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </div>
  )
} // the course, parts before the equal sign '=' must be same name as in the components Header, Content, Total. The names after the '=' is the variable just created inside App() -> const parts

export default App










// Keep this part to explain the connection between variable in each components

/* const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.part} {props.exercises}  
      </p>
    </div>
  ) // the 'part' and 'exercises' after props. is just like a variable (can be named whatever you want)
} 

//    Part part = {props.part1} exercises = {props.exercises1}
// this part ^ must be the same name in the Part component above after props.part <-- (this part)
const Content = (props) => {
  return (
    <div>
      <Part part = {props.part1} exercises = {props.exercises1}/> 
      <Part part = {props.part2} exercises = {props.exercises2}/>
      <Part part = {props.part3} exercises = {props.exercises3}/>
    </div>
  ) // the name after props. is another name (kind of like variable)
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
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
    }
  ]

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {parts[0].name} exercises1 = {parts[0].exercises} part2 = {parts[1].name} exercises2 = {parts[1].exercises} part3 = {parts[2].name} exercises3 = {parts[2].exercises}/>
      <Total exercises1 = {parts[0].exercises} exercises2 = {parts[1].exercises} exercises3 = {parts[2].exercises} />
    </div>
  )
} // the course, part1,2,3 exercise1,2,3 before the equal sign '=' must be same name as in the components Header, Content, Total. The names after the '=' is the variable just created inside App()

export default App */