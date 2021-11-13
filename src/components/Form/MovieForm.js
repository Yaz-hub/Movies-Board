import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import MovieService from "../../services/MovieService";
import ActorField from "./ActorField";
import CategoryInput from "./CategoryInput";
import SimiliarMovieField from "./SimilarMovieField";

const MovieFrom = ({selectdMovie}) => {

  const [categories, setCategories] = useState([]);
  const [actors, setActors] = useState([{ name: "", photo: "", character: "" }]);
  const [similarMovies, setSimilarMovies] = useState([{ title: "", photo: "", release_date: "" }]);
  const navigate = useNavigate();

  const initialMovieState = {
    title: "",
    release_date: "",
    categories: [],
    description: "",
    poster: "",
    backdrop: "",
    actors: [{}],
    similar_movies: [{}],
  };

  useEffect(() => {
    if (selectdMovie) {
      // automatically set values from the selected movie (auto-complete form)
      setMovie({
        title: selectdMovie.title,
        release_date: selectdMovie.release_date,
        description: selectdMovie.overview,
        poster: selectdMovie.poster_path ? "https://image.tmdb.org/t/p/w342" + selectdMovie.poster_path  : "",
        backdrop: selectdMovie.backdrop_path ? "https://image.tmdb.org/t/p/w342" + selectdMovie.backdrop_path : "",
      });
    }
  }, [selectdMovie]);

  const [movie, setMovie] = useState(initialMovieState);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCategoryChange = (items) => {
    setCategories(items);
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'backdrop':
      case 'poster':  
    //     try {
    //       url = new URL(value);
          setMovie((prevState) => ({
            ...prevState,
            [name]: value
          }));
    //     } catch (_) {
    //       // silent 
    //     }
        break;
      default:
        setMovie((prevState) => ({
          ...prevState,
          [name]: value
        }));
    }
  };

  const handleOnSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    event.preventDefault();
    
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    data['categories'] = categories;
    data['actors'] = actors 
    data['similar_movies'] = similarMovies;
    MovieService.create(data);
    navigate("/");
    
    // const values = [title, release_date, description, backdrop, similar_movies, actors, poster];
    // let errorMsg = '';

    // const allFieldsFilled = values.every((field) => {
    //   const value = `${field}`.trim();
    //   return value !== '' && value !== '0';
    // });

    // if (allFieldsFilled) {
    //   const movie = {
    //     id: uuidv4(),
    //     title,
    //     release_date,
    //     description,
    //     actors,
    //     poster,
    //     backdrop,similar_movies
    //   };
    //   props.handleOnSubmit(movie);
    // } else {
    //   errorMsg = 'Please fill out all the fields.';
    // }
    // setErrorMsg(errorMsg);
  };

  return (
    <Container>
      <Form onSubmit={handleOnSubmit}>
      <Form.Group>
        <Form.Label>Movie Title</Form.Label>
        <Form.Control
          className="input-control"
          type="text"
          name="title"
          defaultValue={movie.title}
          placeholder="Enter title of movie"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Realease Date</Form.Label>
        <Form.Control
          className="input-control"
          type="text"
          name="release_date"
          defaultValue={movie.release_date}
          placeholder="Enter Realease Date of movie"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          className="input-control"
          type="text"
          name="description"
          defaultValue={movie.description}
          placeholder="Enter Movie descriotion"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Poster URL</Form.Label>
        <Form.Control
          className="input-control"
          type="text"
          name="poster"
          defaultValue={movie.poster}
          placeholder="Enter Poster URL"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Backdrop URL</Form.Label>
        <Form.Control
          className="input-control"
          type="text"
          name="backdrop"
          defaultValue={movie.backdrop}
          placeholder="Enter backdrop URL"
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Categories</Form.Label>
        <CategoryInput tags={categories} handleChange={handleCategoryChange}></CategoryInput>
      </Form.Group>
      <Form.Group>
        <ActorField actors={actors} setActors={setActors}></ActorField>
        {/* <SimiliarMovieField similarMovies={similarMovies} setSimilarMovies={setSimilarMovies}></SimiliarMovieField> */}
      </Form.Group>
      <Button variant="primary" type="submit" className="submit-btn mt-3">
        Submit
      </Button>
      </Form>
    </Container>
  );
};

export default MovieFrom;
