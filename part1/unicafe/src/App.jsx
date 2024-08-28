import { useState } from "react";

const Button = ({ handleClick, name }) => {
  return <button onClick={handleClick}>{name}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>
        {value}
        {text === "positive" ? " %" : ""}
      </td>
    </tr>
  );
};

const Statistics = ({ good, bad, neutral }) => {
  const total = good + bad + neutral;
  const avg = (good - bad) / (good + bad + neutral);
  const pos = (good * 100) / (good + bad + neutral);

  return (
    <div>
      <h2>statistics</h2>
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <table>
            <tbody>
              <StatisticLine text="good" value={good} />
              <StatisticLine text="neutral" value={neutral} />
              <StatisticLine text="bad" value={bad} />
              <StatisticLine text="all" value={total} />
              <StatisticLine text="average" value={avg ? avg : 0} />
              <StatisticLine text="positive" value={pos ? pos : 0} />
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleGood = () => {
    const value = good + 1;
    setGood(value);
  };
  const handleNeutral = () => {
    const value = neutral + 1;
    setNeutral(value);
  };
  const handleBad = () => {
    const value = bad + 1;
    setBad(value);
  };
  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} name={"good"} />
      <Button handleClick={handleNeutral} name={"neutral"} />
      <Button handleClick={handleBad} name={"bad"} />

      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  );
};

export default App;
