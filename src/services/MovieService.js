import http from "../http-common";

const getAll = () => {
  return http.get("/movies");
};

const get = id => {
  return http.get(`/movies/${id}`);
};
const remove = id => {
  return http.delete(`/movies/${id}`);
};


export default {
    getAll,
    get,
    remove,
};



