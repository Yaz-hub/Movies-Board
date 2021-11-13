import React, { useState, useEffect } from "react";
import MovieService from "../services/MovieService";
import MovieCard from "../components/MovieCard/MovieCard";
import "./MoviesList.css";
import { Col, Container, Row } from "react-bootstrap";
import { Input } from "semantic-ui-react";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = movies.filter((item) => {
        if (item.title || item.categories || item.realease_date) {
          return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
        }
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(movies);
    }
  };

  return (
    <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
      />
      <h3 className="section-title">Movies List</h3>
      <Row className="row-cols-1 row-cols-md-4">
        {searchInput.length > 1
          ? filteredResults.map((movie) => {
              return (
                <Col className="mb-4">
                  <MovieCard
                    key={movie.id}
                    {...movie}
                    handleRemoveMovie={handleRemoveMovie}
                  />
                </Col>
              );
            })
          : movies &&
            movies.map((movie) => (
              <Col className="mb-4">
                <MovieCard
                  key={movie.id}
                  {...movie}
                  handleRemoveMovie={handleRemoveMovie}
                />
              </Col>
            ))}
      </Row>
    </Container>
  );
};

export default MoviesList;
