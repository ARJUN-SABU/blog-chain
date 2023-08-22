import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001",
  // baseURL: "https://bloghain24x7.herokuapp.com/",
});

export default instance;
