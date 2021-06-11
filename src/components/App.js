import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import DAPP from '../abis/DApp.json'
import Navbar from './Navbar'
import Main from './Main'
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    // Network ID
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })



    const networkId = await web3.eth.net.getId()
    const networkData = DAPP.networks[networkId]


    if(networkData) {
      const dapp = new web3.eth.Contract(DAPP.abi, networkData.address)
      this.setState({ dapp })
      const articleCount = await dapp.methods.articleCount().call()
      this.setState({ articleCount })
      this.setState({loading:false})
      // Load images
      for (var i = 1; i <= articleCount; i++) {
        const article = await dapp.methods.articles(i).call()
        this.setState({
          articles: [...this.state.articles, article]
        })
      }
     //Sort articles. Show highest tipped images first
     this.setState({
       articles: this.state.articles.sort((a,b) => b.tipAmount - a.tipAmount )
     })
     this.setState({ loading: false})
    } else {
      window.alert('DAPP contract not deployed to detected network.')
    }
    
    // Network ID
    // const networkId = await web3.eth.net.getId()
    // const networkData = Decentragram.networks[networkId]
    // if(networkData) {
    //   const decentragram = new web3.eth.Contract(Decentragram.abi, networkData.address)
    //   this.setState({ decentragram })
    //   const imagesCount = await decentragram.methods.imageCount().call()
    //   this.setState({ imagesCount })
    //   // Load images
    //   for (var i = 1; i <= imagesCount; i++) {
    //     const image = await decentragram.methods.images(i).call()
    //     this.setState({
    //       images: [...this.state.images, image]
    //     })
    //   }
    //   // Sort images. Show highest tipped images first
    //   this.setState({
    //     images: this.state.images.sort((a,b) => b.tipAmount - a.tipAmount )
    //   })
    //   this.setState({ loading: false})
    // } else {
    //   window.alert('DAPP contract not deployed to detected network.')
    // }
  }

  uploadArticle = (description,keyword1,keyword2,keyword3) => {
    ipfs.add(this.state.buffer,(error,result) => {
      console.log('IPFS RESULT', result)
      if(error){
        console.error(error)
        return
      }
      this.setState({ loading: true })
      this.state.dapp.methods.uploadArticle(result[0].hash,description,keyword1,keyword2,keyword3).send({ from : this.state.account }).on('transactionHash',(hash)=> {
        this.setState({loading:false})
      })
    })
  }

  tipArticle = (id,tipAmount) => {
    this.setState({loading:true})
    this.state.dapp.methods.tipArticle(id).send({ from : this.state.account,value : tipAmount }).on('transactionHash',(hash)=> {
      this.setState({loading:false})
    })
  }

  captureFile = event => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)

    reader.onloadend = () => {
      this.setState({ buffer:Buffer(reader.result) })
     
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dapp:null,
      articles: [],
      loading:true
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            // Code...
            articles = { this.state.articles }
            captureFile = {this.captureFile}
            uploadArticle = {this.uploadArticle}
            tipArticle = { this.tipArticle }
            />
          }
        {'}'}
      </div>
    );
  }
}

export default App;