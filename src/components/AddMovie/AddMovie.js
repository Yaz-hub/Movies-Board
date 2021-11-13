import React, { useState } from "react";
import { Row, Container, FormLabel } from "react-bootstrap";
import MovieService from "../../services/MovieService";
import AsyncSelect from 'react-select/async';
import MovieFrom from "../Form/MovieForm";

const AddMovie = ({navigate, }) => {

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);

    const  handleInputChange = value => {
      setValue(value);
    }

    const handleChange = value =>{
      setSelectedValue(value);
    }

    const loadOptions = async (inputValue) => {
      try {
        const response = await MovieService.serach(inputValue);
        return response.data.results;
      } catch (e) {
        console.log(e);
      }
    }

    const renderMovieForm = () => {
      if (selectedValue) {
        return <Row><MovieFrom selectdMovie={selectedValue}></MovieFrom></Row>;
      }
    }

  return (
    <Container>
    <Row>
      <FormLabel>Search By movie title or Year of realease</FormLabel>
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={selectedValue}
        getOptionLabel={e => e.title}
        getOptionValue={e => e.title}
        loadOptions={loadOptions}
        onInputChange={handleInputChange}
        onChange={handleChange}
      />
    </Row>
    {renderMovieForm()}
    </Container>
  );
};

export default AddMovie;
