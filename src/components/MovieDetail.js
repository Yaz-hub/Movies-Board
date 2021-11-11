import MovieService from "../services/MovieService";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import Actor from "./Actor/Actor";
import SimilarMovie from "./SimilarMovie/SimilarMovie";
import ConfirmModal from "./Modal/ConfirmModal";

const MovieDetail = (prpos) => {

  let { id } = useParams();
  const navigate = useNavigate();

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
        console.log(response.data);
        setCurrentMovie(response.data);
        console.log(currentMovie);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(id);
  }, []);

  

  return (
    <Container>
      {currentMovie.id ? (
        <Row>
          <ConfirmModal movieId={currentMovie.id}></ConfirmModal>
          <Col>
            <h4>{currentMovie.title}</h4>
            <div>{currentMovie.release_date}</div>
            <img
              src={currentMovie.poster}
              className="img-fluid img-cover rounded"
            />
            <ListGroup horizontal>
              {currentMovie.categories.map((c) => (
                <ListGroup.Item>{c}</ListGroup.Item>
              ))}
            </ListGroup>
            <p>{currentMovie.description}</p>
            <Row className="justify-content-center">
              {currentMovie.actors.map((a) => (
                <Actor {...a}></Actor>
              ))}
            </Row>
            <Row className="justify-content-center">
              {currentMovie.similar_movies.map((a) => (
                <SimilarMovie {...a}></SimilarMovie>
              ))}
            </Row>
          </Col>
        </Row>
      ) : (
        <Alert variant="danger">No Movie was found!</Alert>
      )}
    </Container>
  );
};

export default MovieDetail;
