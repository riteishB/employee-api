import axios from "axios";
const baseUrl = "http://localhost:3000/api/employees";

const getEmployees = () => {
  const url = baseUrl;
  return axios.get(url);
};

const addNewEmployee = (data) => {
  const url = baseUrl;
  return axios.post(url, data);
};

const updateEmployee = (id, data) => {
  const url = `${baseUrl}/${id}`;
  return axios.put(url, data);
};

const deleteEmployee = (id) => {
  const url = `${baseUrl}/${id}`;
  return axios.delete(url);
};

export default { getEmployees, addNewEmployee, updateEmployee, deleteEmployee };
