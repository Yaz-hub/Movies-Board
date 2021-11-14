import React, { useState, useEffect } from "react";
import { Row, Container } from "react-bootstrap";
import MovieService from "../services/MovieService";
import MovieFrom from "./Form/MovieForm";
import { useParams } from "react-router-dom";

const EditMovie = () => {
  let { id } = useParams();
  
  const initialMovieState = {
    id: null,
    title: "",
    release_date: "",
    categories: [],
    description: "",
    poster: "",
    backdrop: "",
    actors: [{}],
    similar_movies: [{}],
  };
  const [currentMovie, setCurrentMovie] = useState(initialMovieState);

  const getMovie = (id) => {
    MovieService.get(id)
      .then((response) => {
        // set current movie
        setCurrentMovie(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
      // get movie from api upon first load
    getMovie(id);
  }, []);

  const renderMovieForm = () => {
    if (currentMovie && currentMovie.id) {
      return <Row><MovieFrom editedMovie={currentMovie}></MovieFrom></Row>;
    }
  }

  return (
    <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
        {renderMovieForm()}
    </Container>
  );
};

export default EditMovie;
