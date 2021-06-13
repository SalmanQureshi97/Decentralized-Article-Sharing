import React, { useState, Component } from "react";
import Identicon from "identicon.js";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { InputTags } from "react-bootstrap-tagsinput";
import "react-bootstrap-tagsinput/dist/index.css";
import { Badge } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main
            role="main"
            className="col-lg-12 ml-auto mr-auto"
            style={{ maxWidth: "800px" }}
          >
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>

              {this.props.visible ? (
                <Button
                  onClick={this.props.toggleForm}
                  variant="outline-dark"
                  size="lg"
                  block
                >
                  Upload Article
                </Button>
              ) : (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    const description = this.articleDescription.value;
                    const keyword1 = this.keyword1.value;
                    const keyword2 = this.keyword2.value;
                    const keyword3 = this.keyword3.value;
                    this.props.uploadArticle(
                      description,
                      keyword1,
                      keyword2,
                      keyword3
                    );
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={this.props.captureFile}
                  />
                  <div className="form-group mr-sm-2">
                    <br></br>
                    <input
                      id="imageDescription"
                      type="text"
                      ref={(input) => {
                        this.articleDescription = input;
                      }}
                      className="form-control"
                      placeholder="Article description..."
                      required
                    />
                    <br></br>
                    <InputGroup className="mb-3">
                      <InputGroup.Prepend>
                        <InputGroup.Text>Tags</InputGroup.Text>
                      </InputGroup.Prepend>
                      <FormControl
                        id="keyword1"
                        type="text"
                        ref={(input) => {
                          this.keyword1 = input;
                        }}
                        className="form-control"
                        placeholder=""
                        required
                      />
                      <FormControl
                        id="keyword2"
                        type="text"
                        ref={(input) => {
                          this.keyword2 = input;
                        }}
                        className="form-control"
                        placeholder=""
                        required
                      />

                      <FormControl
                        id="keyword3"
                        type="text"
                        ref={(input) => {
                          this.keyword3 = input;
                        }}
                        className="form-control"
                        placeholder=""
                        required
                      />
                    </InputGroup>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-block btn-lg"
                  >
                    Upload!
                  </button>
                  <button
                    onClick={this.props.toggleForm}
                    className="btn btn-secondary btn-block btn-lg"
                  >
                    Maybe Later?
                  </button>
                </form>
              )}

              <p>&nbsp;</p>
              {this.props.articles.map((article, key) => {
                return (
                  <div className="card mb-4" key={key}>
                    <div className="card-header">
                      <img
                        className="mr-2"
                        width="30"
                        height="30"
                        src={`data:image/png;base64,${new Identicon(
                          article.author,
                          30
                        ).toString()}`}
                      />
                      <small className="text-muted">{article.author}</small>
                    </div>
                    <ul id="imageList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p className="text-center">
                          <iframe
                            src={`https://ipfs.infura.io/ipfs/${article.hash}`}
                            style={{ width: "700px", height: "500px" }}
                          ></iframe>
                          {/* <object data={`https://ipfs.infura.io/ipfs/${article.hash}`} type="application/pdf" width="300" height="200">
                                alt : <a href={`https://ipfs.infura.io/ipfs/${article.hash}`}>test.pdf</a>
                            </object> */}
                          {/* <img src={`https://ipfs.infura.io/ipfs/${article.hash}`} style={{ maxWidth: '420px'}}/> */}
                        </p>
                        <h1>{article.description}</h1>
                        <div className="row">
                          <Badge variant="dark">{article.keyword1}</Badge>
                          <Badge variant="dark">{article.keyword2}</Badge>
                          <Badge variant="dark">{article.keyword3}</Badge>
                        </div>
                      </li>
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS:{" "}
                          {window.web3.utils.fromWei(
                            article.tipAmount.toString(),
                            "Ether"
                          )}{" "}
                          ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={article.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei(
                              "0.1",
                              "Ether"
                            );
                            console.log(event.target.name, tipAmount);
                            this.props.tipArticle(event.target.name, tipAmount);
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
                      </li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
