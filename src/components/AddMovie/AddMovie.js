import React, { useState } from "react";
import { Row, Container, FormLabel } from "react-bootstrap";
import MovieService from "../../services/MovieService";
import AsyncSelect from 'react-select/async';
import MovieFrom from "../Form/MovieForm";
import "../../App.css";

const AddMovie = () => {

    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState(null);
    const [showOptions, setShowOptions] = useState(false);

    const handleInputChange = value => {
      if (value.length >= 2) {
        // user has enterned 3 letters => set showOptions to true
        setShowOptions(true);
      } else {
        setShowOptions(false);
      }
      setValue(value);
    }

    const handleChange = value =>{
      setSelectedValue(value);
    }

    const loadOptions = async (inputValue) => {
      if (!showOptions) {
        // do not call api when showOptions is set to false
        return [];
      }
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
    <Container style={{ paddingTop: 10, paddingBottom: 10 }}>
    <Row>
      <h4 className="section-title">Add New Movie</h4>
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
