import React from "react";
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./SimilarMovie.css";
import Moment from 'moment';

const SimilarMovie = ({
    title,
    poster,
    release_date
}) => {
    const navigate = useNavigate();

    return(
        <Card style={{ width: '14rem' }}>
            <Card.Img variant="top" src={poster ? poster : "cantina.png"} />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className="movie-date">{ Moment(release_date).format('DD/MM/YYYY') }</Card.Text>
            </Card.Body>
        </Card>
    )

}

export default SimilarMovie;


