import React, { Component } from "react";
import Identicon from "identicon.js";
import photo from "../photo.png";
import { Badge } from "react-bootstrap";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";

class Jumbo extends Component {
  render() {
    return (
      <Jumbotron className="text-center">
        <h1>Decentricle</h1>
        <p>Decentralized Article Sharing Platform</p>
        <p>{/* <Button variant="info">Upload an Article?</Button> */}</p>
      </Jumbotron>
    );
  }
}

export default Jumbo;
