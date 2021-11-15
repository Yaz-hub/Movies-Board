import React, { useState, useEffect } from "react";
import MovieService from "../../services/MovieService";
import MovieCard from "../MovieCard/MovieCard";
import { Col, Container, Form, Row } from "react-bootstrap";
import ConfirmModal from "../Modal/ConfirmModal";
import "./MoviesList.css";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovieId, setCurrentMovieId] = useState(null);
  const [show, setShow] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = movies.filter((item) => {
        let searchable = {};
        searchable['title'] = item.title;
        searchable['categories'] = item.categories.join(" ");
        searchable['release_date'] = item.release_date;

        return Object.values(searchable)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(movies);
    }
  };

  return (
    <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Form.Group className="mb-3">
        <Form.Control
          icon="search"
          placeholder="Search..."
          onChange={(e) => searchItems(e.target.value)}
        />
      </Form.Group>
      <h3 className="section-title">Movies List</h3>
      <Row className="row-cols-1 row-cols-md-3 row-cols-lg-4">
        {searchInput.length > 1
          ? filteredResults.map((movie) => {
              return (
                <Col key={movie.id} className="mb-4">
                  <MovieCard
                    key={movie.id}
                    {...movie}
                    setShow={setShow}
                    setCurrentMovieId={setCurrentMovieId}
                  />
                </Col>
              );
            })
          : movies &&
            movies.map((movie) => (
              <Col  key={movie.id} className="mb-4">
                <MovieCard
                  key={movie.id}
                  {...movie}
                  setShow={setShow}
                  setCurrentMovieId={setCurrentMovieId}
                />
              </Col>
            ))}
      </Row>
      <ConfirmModal
        movieId={currentMovieId}
        show={show}
        setShow={setShow}
      ></ConfirmModal>
    </Container>
  );
};

export default MoviesList;
