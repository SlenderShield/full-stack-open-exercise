// eslint-disable-next-line react/prop-types
const Header = ({course}) => <h1>{course}</h1>

// eslint-disable-next-line react/prop-types
const Topic = ({part}) => (<p>
        {/* eslint-disable-next-line react/prop-types */}
        {part.name} {part.exercises}
    </p>
)


const Content = ({parts}) => {
    return (
        parts.map((part, idx) => (
            <Topic part={part} key={idx}/>
        ))
    )
}


// eslint-disable-next-line react/prop-types
const Total = ({parts}) => {
    let sum = 0;
    // eslint-disable-next-line react/prop-types
    parts.map((part) => (sum += part.exercises))
    return (
        <p>Number of exercises {sum}</p>
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
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default App