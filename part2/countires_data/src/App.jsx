/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Data from "./services/countries";

const Search = ({ search, onSearch }) => {
  return (
    <p>
      find countries <input type="text" value={search} onChange={onSearch} />
    </p>
  );
};

const DisplayCountires = ({ filterd, useShow }) => {
  return (
    <>
      {filterd.map((country) => (
        <p key={country.name.common}>
          {country.name.common}{" "}
          <ShowBtn useShow={useShow} name={country.name.common} />{" "}
        </p>
      ))}
    </>
  );
};

const ShowBtn = ({ useShow, name }) => {
  return (
    <button type="button" onClick={useShow} value={name}>
      show
    </button>
  );
};

const CountryData = ({ filterd, useShow }) => {
  return (
    <>
      {filterd.length === 0 ? (
        "No Data available"
      ) : filterd.length === 1 ? (
        <Details country={filterd[0]} />
      ) : filterd.length > 10 ? (
        "Too many matches, specify another filter"
      ) : (
        <DisplayCountires filterd={filterd} useShow={useShow} />
      )}
    </>
  );
};

const Details = ({ country }) => {
  const name = country.name.common;
  const capital = country.capital;
  const area = country.area;
  const languages = Object.values(country.languages);
  const image = country.flags.png;
  const alt = country.flags.alt;
  return (
    <>
      <h2>{name}</h2>
      <p>capital: {capital}</p>
      <p>area: {area}</p>
      <p>languages:</p>
      <ul></ul>
      <ul>
        {languages.map((language, idx) => (
          <li key={idx}>{language}</li>
        ))}
      </ul>
      <img src={image} alt={alt} />
    </>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filterd, setFilterd] = useState(countries);

  useEffect(() => {
    Data.getAll().then((res) => setCountries(res));
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
    const updateCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value)
    );
    setFilterd(updateCountries);
  };

  const handleShow = (event) => {
    const newCountry = event.target.value;
    Data.getCountry(newCountry).then((res) => {
      setFilterd([res]);
    });
  };

  return (
    <>
      <Search search={search} onSearch={handleSearch} />
      <CountryData filterd={filterd} useShow={handleShow} />
    </>
  );
}

export default App;
