import MovieService from "../../services/MovieService";
import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({movieId, show}) => {
    const navigate = useNavigate();
  
    const handleClose = () => setShow(false);
    
    const handleRemoveMovie = (id) => {
        MovieService.remove(id);
        navigate('/movies');
    };
    
    return (
      <>  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this movie!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => handleRemoveMovie(movieId)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default DeleteModal;