import axios from "axios";
const baseUrl = "http://localhost:3001/contacts";

const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    firstName: "Jose",
    lastName: "Aldo",
    jobTitle: "King of Rio",
    location: "Brasil",
    priority: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
  // return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};
const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};
export default {
  getAll,
  create,
  update,
  remove,
};
