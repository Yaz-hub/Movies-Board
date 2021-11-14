import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json"
  }
});

const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org",
  headers: {
    "Content-type": "application/json"
  }
});

export {
  http,
  TMDB
};