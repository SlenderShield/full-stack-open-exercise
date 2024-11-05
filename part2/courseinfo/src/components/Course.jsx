/* eslint-disable react/prop-types */
const Header = ({ course }) => <h1>{course}</h1>;

const Topic = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return parts.map((part, idx) => <Topic part={part} key={idx} />);
};

const Total = ({ parts }) => {
  let sum = Object.keys(parts).reduce((sum, val) => {
    return sum + parts[val].exercises;
  }, 0);

  return (
    <p>
      <strong>total of {sum} exercises</strong>
    </p>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      <Header course={courses.name} />
      <Content parts={courses.parts} />
      <Total parts={courses.parts} />
    </div>
  );
};
export default Course;
