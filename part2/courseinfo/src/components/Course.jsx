/* eslint-disable react/prop-types */
const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </>
  );
};
const Total = ({ parts }) => {
  const getSum = (total, part) => {
    return total + part.exercises;
  };
  return <strong>Total of {parts.reduce(getSum, 0)} exercises</strong>;
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
