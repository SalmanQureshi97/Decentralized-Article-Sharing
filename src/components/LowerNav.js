import React, { Component } from "react";
import Keyword from "./Keyword";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";

class LowerNav extends Component {
  render() {
    return (
      <Container fluid="md">
        <Alert variant="primary">
          {" "}
          <Keyword account={this.props.account} />{" "}
        </Alert>
      </Container>
    );
  }
}

export default LowerNav;
