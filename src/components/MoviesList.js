import React, { useState, useEffect } from "react";
import MovieService from "../services/MovieService";
import MovieCard from "../components/MovieCard/MovieCard"


const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  
  useEffect(() => {
    retrieveMovies();
  }, []);

  const handleRemoveMovie = (id) => {
    MovieService.remove(id);
    retrieveMovies();
  };

  const retrieveMovies = () => {
    MovieService.getAll()
      .then((response) => {
        setMovies(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="col-md-12 bg-dark">
      <div className="row justify-content-center">
        <h4>Movies List</h4>
        {movies &&
          movies.map((movie, index) => (
            <MovieCard key={movie.id} {...movie} handleRemoveMovie={handleRemoveMovie} />
          ))}
      </div>
    </div>
  );
};

export default MoviesList;
