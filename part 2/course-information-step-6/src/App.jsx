const Header = (props) => {
  return (
    <div>
      <h2>
        {props.course}
      </h2>
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
  ) 
} 

const Content = (props) => {
  return (
    <div>
      {props.parts.map((item) => {
        return (
          <Part key = {item.id} part = {item.name} exercises = {item.exercises} />
        )
      })}
    </div>
  ) 
}

const Total = (props) => {
  return (                // parts down here
    <div>             
      <p><strong>total of {props.parts.reduce((sum, currentValue) => {
        sum += currentValue.exercises 
        return sum                    
      }, 0)} exercises</strong></p> 
    </div>
  ) // currentValue is the first object in parts array                    
} // must initial sum with 0, if not sum will be the first object which will cause error cause we need sum to be a number

const Course = (props) => {
  return (
    <div>
      {props.courses.map((course) => {
        return (
          <div key = {course.id}> 
            <Header  course = {course.name} />
            <Content parts = {course.parts} />
            <Total parts = {course.parts} />
          </div>
        )
      })}
    </div>
  ) // this parts from Total before the = sign is the same as the parts before the .reduce in Total
}


// the process will be: course.parts.name (or course.parts.exercise), but we split it to 2 components
// the Content component will handle the parts.name (or parts.exercise)(use map if have multiple name)
// the Course component will handle the course.parts (use map if have multiple course)
// add 2 together will have course.parts.name. Content has another helper component which is Part.

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </div>
    
  )
}

export default App 