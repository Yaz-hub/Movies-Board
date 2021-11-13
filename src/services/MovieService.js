import http from "../http-common";
import TMDB from "../TMDB";

const getAll = () => {
  return http.get("/movies");
};

const get = id => {
  return http.get(`/movies/${id}`);
};
const remove = id => {
  return http.delete(`/movies/${id}`);
};

const serach = (text = '', year = null) => {
  return TMDB.get(`/3/search/movie?api_key=32ce1364a5dbb3e2ec81dba08a7f228f&language=en-US&query=${text}&year=${year}`);
};
const create = (data) => {
  return http.post(`/movies`, data);
};

export default {
    getAll,
    get,
    remove,
    serach,
    create,
};



