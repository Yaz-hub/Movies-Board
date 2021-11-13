import React from "react";
import { Container, Nav, Navbar  } from "react-bootstrap";
  
const Footer = () => {
  return (
    <Container fluid style={{ backgroundColor: "#190f54", padding: "20px" }}>
        <div className="text-center" style={{color: " #fff"}}>
        Movies Board @2021
        </div>
     </Container>
  );
};

export default Footer;