import React from "react";
import { Container } from "react-bootstrap";
  
const Footer = () => {
  return (
    <div className="footer">
    <Container fluid style={{ backgroundColor: "#190f54", padding: "20px" }}>
        <div className="text-center" style={{color: " #fff"}}>
        Movies Board @2021
        </div>
     </Container>
     </div>
  );
};

export default Footer;