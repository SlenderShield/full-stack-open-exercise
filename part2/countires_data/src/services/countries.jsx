import axios from "axios";

const baseURL = "https://studies.cs.helsinki.fi/restcountries";
const all = "api/all";
const specific = "api/name";

const getAll = () => {
  const response = axios.get(`${baseURL}/${all}`).then((res) => res.data);
  return response;
};

const getCountry = (name) => {
  const response = axios
    .get(`${baseURL}/${specific}/${name}`)
    .then((res) => res.data);
  return response;
};
export default { getAll, getCountry };
