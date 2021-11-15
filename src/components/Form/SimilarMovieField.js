import { Form, Button } from "react-bootstrap";
import { useState } from "react";


const SimiliarMovieField = ({similarMovies, setSimilarMovies}) => {

  const [required, setRequired] = useState(false); 

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...similarMovies];
    // remove sm. prefix before settig key
    list[index][name.replace('sm.','')] = value;
    setSimilarMovies(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...similarMovies];
    list.splice(index, 1);
    setSimilarMovies(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setSimilarMovies([...similarMovies, { title: "", poster: "", release_date: "" }]);
  };

  return (
    <>
      {similarMovies.map((x, i) => {
        return (
            <div key={"sm"+i}>
            <Form.Group>
              <Form.Label>Movie Title</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                required={required}
                name="sm.title"
                value={x.title}
                placeholder="Enter Movie Title"
                onChange={(e) => handleInputChange(e, i)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Movie Poster</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                required={required}
                name="sm.poster"
                value={x.poster}
                placeholder="Enter Movie Poster URL"
                onChange={(e) => handleInputChange(e, i)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Realease Date</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                required={required}
                name="sm.release_date"
                value={x.release_date}
                placeholder="Enter Release Date"
                onChange={(e) => handleInputChange(e, i)}
              />
            </Form.Group>
            <div className="mt-3">
              {similarMovies.length !== 1 && (
                <Button
                  variant="danger"
                  className="btn btn-sm mr-2"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove Movie
                </Button>
              )}
              {similarMovies.length - 1 === i && (
                <Button
                  variant="primary"
                  className="btn btn-sm"
                  onClick={handleAddClick}
                >
                  Add Similar Movie
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SimiliarMovieField;
