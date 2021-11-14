import React, { useState, useEffect } from "react";
import MovieService from "../../services/MovieService";
import MovieCard from "../MovieCard/MovieCard";
import { Col, Container, Modal, Row } from "react-bootstrap";
import ConfirmModal from "../Modal/ConfirmModal";
import "./MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    retrieveMovies();
  }, [show]);

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
      <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
          <h3 className="section-title">Movies List</h3>
          <Row className="row-cols-1 row-cols-md-4">
              {movies &&
                movies.map((movie, index) => (
                  <Col key={movie.id} className="mb-4">
                    <MovieCard {...movie} setShow={setShow} setCurrentMovieId={setCurrentMovieId} />
                  </Col>
                ))}
          </Row>
          <ConfirmModal movieId={currentMovieId} show={show} setShow={setShow}></ConfirmModal>
      </Container>
  );
};

export default MoviesList;
