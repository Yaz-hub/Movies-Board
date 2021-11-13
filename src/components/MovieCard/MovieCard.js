import React from "react";
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import "./MovieCard.css";
import { useNavigate } from 'react-router-dom';


function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n-1) + ' ...' : str;
};

const MovieCard = ({
    id,
    title,
    release_date,
    description,
    poster,
    handleRemoveMovie
  }) => {
    const navigate = useNavigate();

    return (
        <Card style={{ width: '18rem' }} className="book">
            <Card.Img variant="top" src={poster ? poster : "cantina.png"} onClick={() => navigate(`/movies/${id}`)}  />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className="movie-date">{release_date}</Card.Text>
                <Card.Text>{truncate(description, 100)}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button size="sm" variant="primary" onClick={() => navigate(`/movies/${id}`)}>
                    Edit
                </Button>{' '}
                <Button size="sm" variant="danger" onClick={() => handleRemoveMovie(id)}>
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default MovieCard;
