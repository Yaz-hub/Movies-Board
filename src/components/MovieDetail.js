import MovieService from "../services/MovieService";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Alert } from "react-bootstrap";
import Actor from "./Actor/Actor";
import SimilarMovie from "./SimilarMovie/SimilarMovie";
import ConfirmModal from "./Modal/ConfirmModal";
import Moment from 'moment';
import "./MovieDetail.css";

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
        setCurrentMovie(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(id);
  }, []);

  return (
    <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
      {currentMovie.id ? (
        <Row>
          <Col>
            <Row>
              <Col xs={8}>
                <h4 className="section-title">{currentMovie.title}</h4>
              </Col>
              <Col className="actions">
                <ConfirmModal movieId={currentMovie.id}></ConfirmModal>
              </Col>
            </Row>
            <Row>
              <div className="date">{ Moment(currentMovie.release_date).format('DD/MM/YYYY') }</div>
            </Row>
            {/* <div className="text-center" style={{ backgroundImage: `url(${currentMovie.backdrop})` }}> */}
            <img src={currentMovie.poster} className="img-fluid img-cover rounded" style={{ backdropFilter: "blur(100px)" }}/>
            {/* </div> */}
            <ListGroup horizontal className="movie-categories">
              {currentMovie.categories.map((c) => (
                <ListGroup.Item>{c}</ListGroup.Item>
              ))}
            </ListGroup>
            <p className="pt-2 pb-2">{currentMovie.description}</p>

            <h4 className="section-title">Cast</h4>
            <Row className="">
                {currentMovie.actors.map((a) => (
                  <Actor {...a}></Actor>
                ))}
            </Row>

            <h4 className="section-title">Similar Movies</h4>
            <Row className="row-cols-1 row-cols-md-4">
                {currentMovie.similar_movies.map((a) => (
                  <Col className="mb-4">
                    <SimilarMovie {...a}></SimilarMovie>
                  </Col>
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
