/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import phonebook from "./services/phonebook";

const Filter = ({ filter, onSearch }) => {
  return (
    <>
      filter shown with
      <input type="text" value={filter} onChange={onSearch} />
    </>
  );
};

const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onNewPerson,
}) => {
  return (
    <form onSubmit={onNewPerson}>
      <div>
        name: <input value={newName} type="text" onChange={onNameChange} />
      </div>
      <div>
        phone number:
        <input value={newNumber} type="number" onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name}: {person.number}
          <button
            type="button"
            onClick={onDelete}
            value={person.id}
            name={person.name}
          >
            delete
          </button>
        </p>
      ))}
    </>
  );
};

const Notification = ({ message, style }) => {
  const addedStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const deletedStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (message === "") return;
  return (
    <div style={style === "add" ? addedStyle : deletedStyle}>{message}</div>
  );
};

function App() {
  const [persons, setPersons] = useState([]);
  const [filtered, setFiltered] = useState(persons);

  useEffect(() => {
    phonebook.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("add");

  const handleName = (event) => {
    const name = event.target.value;
    setNewName(name);
  };

  const handleNumber = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  };

  const handleSearch = (event) => {
    const filter = event.target.value;
    setFilter(filter);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFiltered(filtered);
  };

  const updatePersons = (res) => {
    const updates = persons.filter((person) => person.id !== res.id);
    return [...updates, res];
  };

  const handleNewPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    setNewName("");
    setNewNumber("");
    for (const person of persons) {
      if (person.name.toLowerCase() === newPerson.name.toLowerCase()) {
        newPerson.id = person.id;
        window.confirm(
          `${newPerson.name} is already added to phonebook, replace the old number with the new one?`
        )
          ? phonebook
              .updatePerson(newPerson)
              .then((res) => setPersons(updatePersons(res)))
          : "";
        return;
      }
    }
    phonebook
      .postPerson(newPerson)
      .then((res) => setPersons([...persons, res]));
    setMessage(`${newPerson.name} added to the  phonebook`);
    setStyle("add");
    setTimeout(() => setMessage(""), 5000);
  };

  const handleDelete = (event) => {
    const id = event.target.value;
    const name = event.target.name;
    window.confirm(`Delete ${name}?`)
      ? phonebook
          .deletePerson(id)
          .then((res) =>
            setPersons(persons.filter((person) => person.id !== res.id))
          )
      : "";
    setMessage(`${name} deleted from phonebook`);
    setStyle("delete");
    setTimeout(() => setMessage(""), 5000);
  };

  return (
    <>
      <Notification message={message} style={style} />
      <h2>Phonebook</h2>

      <Filter filter={filter} onSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={handleName}
        onNumberChange={handleNumber}
        onNewPerson={handleNewPerson}
      />

      <h3>Numbers</h3>

      <Persons
        persons={filter !== "" ? filtered : persons}
        onDelete={handleDelete}
      />
    </>
  );
}

export default App;
