import axios from "axios";

const baseURL = "/api/persons";

const getAll = async () => {
  const response = await axios.get(baseURL).then((res) => res.data);
  return response;
};

const postPerson = async (person) => {
  const response = await axios.post(baseURL, person).then((res) => res.data);
  console.log(response);
  return response;
};

const deletePerson = async (id) => {
  const response = await axios
    .delete(`${baseURL}/${id}`)
    .then((res) => res.data);
  return response;
};

const updatePerson = async (person) => {
  const response = await axios
    .put(`${baseURL}/${person.id}`, person)
    .then((res) => res.data);
  return response;
};

export default { getAll, postPerson, deletePerson, updatePerson };
