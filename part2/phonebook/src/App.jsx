import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const Filter = ({ newSearch, handleSearch }) => (
  <p>
    filter shown with{" "}
    <input type="text" value={newSearch} onChange={handleSearch} />
  </p>
);

const PersonForm = ({
  newName,
  newNumber,
  handleName,
  handleNumber,
  handleUser,
}) => (
  <form>
    <div>
      name: <input value={newName} onChange={handleName} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumber} />
    </div>
    <div>
      <button type="submit" onClick={handleUser}>
        add
      </button>
    </div>
  </form>
);

const Persons = ({ show }) =>
  show.map((person) => (
    <p key={person.id}>
      {person.name} {person.number}
    </p>
  ));

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [show, setShow] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(response.data);
      setPersons(response.data);
      setShow(response.data);
    });
  }, []);

  const handleName = (event) => {
    let value = event.target.value;
    setNewName(value);
  };

  const handleNumber = (event) => {
    let value = event.target.value;
    setNewNumber(value);
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setNewSearch(value);
    const exist = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    if (exist.length > 0) {
      setShow(exist);
    } else {
      setShow(persons);
    }
  };

  const handleUser = (event) => {
    event.preventDefault();
    const exist = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    console.log(exist);
    if (exist.length > 0) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    let person = { id: persons.length + 1, name: newName, number: newNumber };
    axios
      .post(`http://localhost:3001/persons`, person)
      .then((response) => setPersons(response.data));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleName={handleName}
        handleNumber={handleNumber}
        handleUser={handleUser}
      />
      <h2>Numbers</h2>
      <Persons show={show} />
    </div>
  );
};

export default App;
