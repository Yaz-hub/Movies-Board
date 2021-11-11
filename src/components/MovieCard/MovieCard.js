import React from "react";
import { Button, Card } from 'react-bootstrap';
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
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <div>
                    <img src={poster ? poster : "cantina.png"}  onClick={() => navigate(`/movies/${id}`)} className="card-image img-fluid img-cover rounded-top"/>
                    <div className="date">{release_date}</div>
                    <div><p>{truncate(description, 100)}</p></div>
                </div>
                <Button variant="danger" onClick={() => handleRemoveMovie(id)}>
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;
