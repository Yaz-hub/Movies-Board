import { React } from "react";
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import "./MovieCard.css";

function truncate(str, n) {
    return (str.length > n) ? str.substr(0, n-1) + ' ...' : str;
};

const MovieCard = ({
    id,
    title,
    release_date,
    description,
    poster,
    setShow,
    setCurrentMovieId
  }) => {
    const navigate = useNavigate();
    const handleShow = () => setShow(true);

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={poster ? poster : "cantina.png"} onClick={() => navigate(`/movies/${id}`)}  />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text className="movie-date">{ Moment(release_date).format('DD/MM/YYYY') }</Card.Text>
                <Card.Text>{truncate(description, 100)}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button size="sm" variant="primary" onClick={() => navigate(`/movies/${id}/edit`)}>
                    Edit
                </Button>{' '}
                <Button size="sm" variant="danger" onClick={() => {handleShow(); setCurrentMovieId(id)}}>
                    Delete
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default MovieCard;
