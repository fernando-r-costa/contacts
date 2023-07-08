import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3004/contacts",
  // json-server --watch db.json --port 3004
});

export default API;