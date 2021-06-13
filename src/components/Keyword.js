import React, { Component } from "react";
import Identicon from "identicon.js";
import photo from "../photo.png";
import { Badge } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

class Keyword extends Component {
  render() {
    return this.props.account.map((article, key) => {
      return <Badge variant="primary">{article}</Badge>;
    });
  }
}

export default Keyword;
