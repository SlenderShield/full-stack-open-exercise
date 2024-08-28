import { useState } from "react";

function App() {
  const randomNumber = () => Math.floor(Math.random() * anecdotes.length);

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({});

  const handleVote = () => {
    votes[selected] = votes[selected] ? votes[selected] + 1 : 1;
    setVotes({ ...votes });
  };

  const getMax = () => {
    // Convert object values to an array
    const values = Object.values(votes);

    // Find the maximum value
    const max = Math.max(...values);

    // Find the index of the maximum value
    const index = values.indexOf(max);

    // Get the key corresponding to the maximum value
    const key = Object.keys(votes)[index];
    return key;
  };

  return (
    <>
      <h2>Acedote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected] ? votes[selected] : 0} votes</p>
      <button type="button" onClick={handleVote}>
        vote
      </button>
      <button type="button" onClick={() => setSelected(randomNumber)}>
        next anecdotes
      </button>
      <h2>Acedote with most vote</h2>
      {anecdotes[getMax() ? getMax() : 0]}
    </>
  );
}

export default App;
