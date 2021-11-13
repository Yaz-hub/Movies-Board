import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    "Content-type": "application/json"
  }
});