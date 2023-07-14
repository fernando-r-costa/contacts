import axios from "axios";

const API = axios.create({
  baseURL: "https://banco-dados.vercel.app/contacts",
  // baseURL: "http://localhost:3004/contacts",
  // json-server --watch db.json --port 3004
});

export default API;