import axios from "axios";


export default axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-type": "application/json",
  },
});

export const url = 'http://localhost:1000/api';