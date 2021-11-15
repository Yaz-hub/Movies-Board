import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const ActorField = ({actors, setActors}) => {
  const [required, setRequired] = useState(false); 
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (value !== "") {
        setRequired(true);
    }
    const list = [...actors];
    // remove actor. prefix before settig key
    list[index][name.replace('actor.','')] = value;
    setActors(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...actors];
    list.splice(index, 1);
    setActors(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setActors([...actors, { name: "", photo: "", character: "" }]);
  };

  

  return (
    <>
      {actors.map((x, i) => {
        return (
          <div key={"a"+i}>
            <Form.Group>
              <Form.Label>Actor Name</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                required={required}
                name="actor.name"
                value={x.name}
                placeholder="Enter Actor Name"
                onChange={(e) => handleInputChange(e, i)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Actor Photo</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                required={required}
                name="actor.photo"
                value={x.photo}
                placeholder="Enter Actor photo URL"
                onChange={(e) => handleInputChange(e, i)}
              />
            </Form.Group>
            <Form.Group>  
              <Form.Label>Actor Role</Form.Label>
              <Form.Control
                className="input-control"
                type="text"
                required={required}
                name="actor.character"
                value={x.character}
                placeholder="Enter Role of actor"
                onChange={(e) => handleInputChange(e, i)}
              />
            </Form.Group>
            <div className="mt-3">
              {actors.length !== 1 && (
                <Button
                  variant="danger"
                  className="btn btn-sm mr-2"
                  onClick={() => handleRemoveClick(i)}
                >
                  Remove Actor
                </Button>
              )}
              {actors.length - 1 === i && (
                <Button
                  variant="primary"
                  className="btn btn-sm"
                  onClick={handleAddClick}
                >
                  Add Actor
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ActorField;
