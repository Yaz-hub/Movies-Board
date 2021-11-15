import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import MovieService from "../../services/MovieService";
import ActorField from "./ActorField";
import CategoryInput from "./CategoryInput";
import SimiliarMovieField from "./SimilarMovieField";
import validator from "validator";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MovieForm.css";

const MovieFrom = ({ selectdMovie, editedMovie }) => {
  const [validated, setValidated] = useState(false);

  // set movie according to passed params (either selected or edited)
  const [movie, setMovie] = useState(
    editedMovie && editedMovie.id ? editedMovie : selectdMovie
  );

  const [errorMsg, setErrorMsg] = useState("");
  const [releaseDate, setReleaseDate] = useState(new Date(movie.release_date));
  const [categories, setCategories] = useState(
    movie.categories ? movie.categories : []
  );
  const [actors, setActors] = useState(
    movie.actors && movie.actors.length
      ? movie.actors
      : [{ name: "", photo: "", character: "" }]
  );
  const [similarMovies, setSimilarMovies] = useState(
    movie.similar_movies && movie.similar_movies.length
      ? movie.similar_movies
      : [{ title: "", poster: "", release_date: "" }]
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (selectdMovie) {
      // automatically set values from the selected movie (auto-complete form)
      setMovie({
        title: selectdMovie.title,
        release_date: selectdMovie.release_date
          ? new Date(selectdMovie.release_date)
          : "",
        description: selectdMovie.overview,
        poster: selectdMovie.poster_path
          ? "https://image.tmdb.org/t/p/w342" + selectdMovie.poster_path
          : "",
        backdrop: selectdMovie.backdrop_path
          ? "https://image.tmdb.org/t/p/w342" + selectdMovie.backdrop_path
          : "",
        actors: [{}],
        similar_movies: [{}],
        categories: [],
      });
    }
  }, [selectdMovie]);

  const handleCategoryChange = (items) => {
    setCategories(items);
  };

  const cleanArray = (items) => {
    // clean empty object properties
    let cleanedItems = items.map((element) => {
      return Object.fromEntries(
        Object.entries(element).filter(([_, v]) => v !== "")
      );
    });
    // remove empty objects from array
    return cleanedItems.filter((value) => Object.keys(value).length !== 0);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let error = [];
    switch (name) {
      case "poster":
      case "backdrop":
        if (!validator.isURL(value)) {
          error[name] = "Please enter a valid URL for " + name;
        }
        break;
      default:
        setMovie((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
    setErrorMsg(error);
  };

  const handleOnSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    if (errorMsg !== "") {
      return;
    }

    const data = {};
    for (let [key, value] of formData.entries()) {
      if (key.startsWith("actor.") || key.startsWith("sm.")) {
        // skip posted data for actor. and sm.
        // fields are handled in state (actors, similar_movies)
        continue;
      }
      data[key] = value;
    }

    if (releaseDate && releaseDate instanceof Date) {
      // handle release_date format
      let y = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
        releaseDate
      );
      let m = new Intl.DateTimeFormat("en-US", { month: "2-digit" }).format(
        releaseDate
      );
      let d = new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(
        releaseDate
      );

      Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "2-digit",
      }).format(releaseDate);
      Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "2-digit",
      }).format(releaseDate);
      Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "numeric",
        day: "2-digit",
      }).format(releaseDate);
      data["release_date"] = `${y}-${m}-${d}`;
    }
    data["categories"] = categories;
    data["actors"] = cleanArray(actors);
    data["similar_movies"] = cleanArray(similarMovies);
    if (editedMovie && editedMovie.id) {
      MovieService.update(editedMovie.id, data);
    } else {
      console.log(data);
      MovieService.create(data);
    }
    navigate("/");
  };

  return (
    <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
      <Form onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Movie Information</legend>
          <Form.Group className="mb-3">
            <Form.Label>Movie Title</Form.Label>
            <Form.Control
              required
              className="input-control"
              type="text"
              name="title"
              defaultValue={movie.title}
              placeholder="Enter title of movie"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Realease Date</Form.Label>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={releaseDate}
              onChange={(date) => setReleaseDate(date)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={5}
              className="input-control"
              type="text"
              name="description"
              defaultValue={movie.description}
              placeholder="Enter Movie descriotion"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Poster URL</Form.Label>
            <Form.Control
              className="input-control"
              type="text"
              name="poster"
              defaultValue={movie.poster}
              placeholder="Enter Poster URL"
              onChange={handleInputChange}
            />
            <span style={{ fontWeight: "bold", color: "red" }}>
              {errorMsg["poster"]}
            </span>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Backdrop URL</Form.Label>
            <Form.Control
              className="input-control"
              type="text"
              name="backdrop"
              defaultValue={movie.backdrop}
              placeholder="Enter backdrop URL"
              onChange={handleInputChange}
            />
            <span style={{ fontWeight: "bold", color: "red" }}>
              {errorMsg["backdrop"]}
            </span>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Categories</Form.Label>
            <CategoryInput
              tags={categories}
              handleChange={handleCategoryChange}
            ></CategoryInput>
          </Form.Group>
        </fieldset>
        <fieldset>
          <legend>Actors</legend>
          <Form.Group className="mb-3">
            <ActorField actors={actors} setActors={setActors}></ActorField>
          </Form.Group>
        </fieldset>
        <fieldset>
          <legend>Similar Movies</legend>
          <Form.Group className="mb-3">
            <SimiliarMovieField
              similarMovies={similarMovies}
              setSimilarMovies={setSimilarMovies}
            ></SimiliarMovieField>
          </Form.Group>
        </fieldset>
        <Button variant="primary" type="submit" className="submit-btn mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default MovieFrom;
