import React from "react";
import { Col, Image } from "react-bootstrap";
import ReactRoundedImage from "react-rounded-image";
import "./Actor.css";

const Actor = ({
    photo,
    name,
    character,
  }) => {
    return(
        <Col xs={6}>
            <Col xs={2} className="align-items-center">
                <ReactRoundedImage
                    image={photo}
                    roundedColor="#321124"
                    imageWidth="100"
                    imageHeight="100"
                    roundedSize="5"
                    borderRadius="40"
                />
            </Col>
            <Col xs={2}><span className="text-center actor">{name}</span></Col>
            <Col><span className="text-center actor">{character}</span></Col>
        </Col>
    );
}
      


  


  export default Actor;