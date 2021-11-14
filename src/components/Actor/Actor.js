import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Actor.css";

const Actor = ({
    photo,
    name,
    character,
  }) => {
    return(
        <Col xs={12} md={6}>
            <Row>
                <Col xs={4} md={2} className="mb-4">
                    <div className="avatar-big"> 
                        <img className="avatar-img rounded-circle" src={photo} alt={name} />
                    </div>
                </Col>
                <Col xs={6} className="mb-4">
                    <div className="mt-3">
                        <p>
                            <span className="actor">{name}</span><br/>
                            <span className="character">{character}</span>
                        </p>
                    </div>
                </Col>
            </Row>
        </Col>
    );
}
      


  


  export default Actor;