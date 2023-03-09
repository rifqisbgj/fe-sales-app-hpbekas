import axios from "axios";
// import { BASE_URL } from process.env

export default axios.create({
  baseURL: "http://localhost:8080",
});
