import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.imageDescription.value
                const keyword1  = this.keyword1.value
                const keyword2  = this.keyword2.value
                const keyword3  = this.keyword3.value
                this.props.uploadArticle(description,keyword1,keyword2,keyword3)
              }} >
                <input type='file' accept=".pdf" onChange={this.props.captureFile} />
                  <div className="form-group mr-sm-2">
                    <br></br>
                      <input
                        id="imageDescription"
                        type="text"
                        ref={(input) => { this.imageDescription = input }}
                        className="form-control"
                        placeholder="Image description..."
                        required />
                        <br></br>
                      <input
                        id="keyword1"
                        type="text"
                        ref={(input) => { this.keyword1 = input }}
                        className="form-control"
                        placeholder="keyword1"
                        required />
                        <br></br>
                      <input
                        id="keyword2"
                        type="text"
                        ref={(input) => { this.keyword2 = input }}
                        className="form-control"
                        placeholder="keyword2"
                        required />
                        <br></br>
                      <input
                        id="keyword3"
                        type="text"
                        ref={(input) => { this.keyword3 = input }}
                        className="form-control"
                        placeholder="Keyword3"
                        required />
                  </div>
                <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
              </form>

              <p>&nbsp;</p>


                
                {
                  this.props.articles.map((article, key) => {
                    return(
                      <div className="card mb-4" key={key} >
                        <div className="card-header">
                          <img
                            className='mr-2'
                            width='30'
                            height='30'
                            src={`data:image/png;base64,${new Identicon(article.author, 30).toString()}`}
                          />
                          <small className="text-muted">{article.author}</small>
                        </div>
                        <ul id="imageList" className="list-group list-group-flush">
                          <li className="list-group-item">
                            <p class="text-center">
                            <iframe src={`https://ipfs.infura.io/ipfs/${article.hash}`} style={{width:'200',height:'500px'}}></iframe>
                            {/* <object data={`https://ipfs.infura.io/ipfs/${article.hash}`} type="application/pdf" width="300" height="200">
                                alt : <a href={`https://ipfs.infura.io/ipfs/${article.hash}`}>test.pdf</a>
                            </object> */}
                              {/* <img src={`https://ipfs.infura.io/ipfs/${article.hash}`} style={{ maxWidth: '420px'}}/> */}
                            </p>
                            <p>{article.description}</p>
                            <p>{article.keyword1}</p>
                            <p>{article.keyword2}</p>
                            <p>{article.keyword3}</p>
                          </li>
                          <li key={key} className="list-group-item py-2">
                            <small className="float-left mt-1 text-muted">
                              TIPS: {window.web3.utils.fromWei(article.tipAmount.toString(), 'Ether')} ETH
                            </small>
                            <button
                              className="btn btn-link btn-sm float-right pt-0"
                              name={article.id}
                              onClick={(event) => {
                                let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                                console.log(event.target.name, tipAmount)
                                this.props.tipArticle(event.target.name, tipAmount)
                              }}
                            >
                              TIP 0.1 ETH
                            </button>
                          </li>
                        </ul>
                      </div>
                    )
                  })
                }

            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;