const DApp = artifacts.require('./DApp.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('DApp', ([deployer, author, tipper]) => {
  let dapp

  before(async () => {
    dapp = await DApp.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await dapp.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

  })

  describe('articles', async () => {
    let result, articleCount
    const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'
    let keyword1 = "Selenium"
    let keyword2 = "Python"
    let keyword3 = "Automation"

    before(async () => {
      result = await dapp.uploadArticle(hash, 'Article description', keyword1,keyword2,keyword3,{ from: author })
      articleCount = await dapp.articleCount()
    })

    //check event
    it('creates articles', async () => {
      // SUCESS
      assert.equal(articleCount, 1)
      const event = result.logs[0].args
      //console.log(event)
      assert.equal(event.id.toNumber(), articleCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Article description', 'description is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')
      assert.equal(event.keyword1, 'Selenium', 'Keyword 1 is correct')
      assert.equal(event.keyword2, 'Python', 'Keyword 2 is correct')
      assert.equal(event.keyword3, 'Automation', 'Keyword 3 author is correct')


      // FAILURE: Article must have hash
      await dapp.uploadArticle('', 'Article description',keyword1,keyword2,keyword3, { from: author }).should.be.rejected;

      // FAILURE: Article must have description
      await dapp.uploadArticle('Article hash', '', { from: author }).should.be.rejected;

      // FAILURE: Article must have Keywords
      await dapp.uploadArticle('Article hash', 'Article description', '',{ from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists articles', async () => {
      const article = await dapp.articles(articleCount)
      assert.equal(article.id.toNumber(), articleCount.toNumber(), 'id is correct')
      assert.equal(article.hash, hash, 'Hash is correct')
      assert.equal(article.description, 'Article description', 'description is correct')
      assert.equal(article.tipAmount, '0', 'tip amount is correct')
      assert.equal(article.author, author, 'author is correct')
      assert.equal(article.keyword1, 'Selenium', 'Keyword 1 is correct')
      assert.equal(article.keyword2, 'Python', 'Keyword 2 is correct')
      assert.equal(article.keyword3, 'Automation', 'Keyword 3 author is correct')
    })

    it('allows users to tip articles', async () => {
      // Track the author balance before purchase
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await dapp.tipArticle(articleCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), articleCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Article description', 'description is correct')
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // Check that author received funds
      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      let tipArticle
      tipArticle = web3.utils.toWei('1', 'Ether')
      tipArticle = new web3.utils.BN(tipArticle)

      const expectedBalance = oldAuthorBalance.add(tipArticle)

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      // FAILURE: Tries to tip a image that does not exist
      await dapp.tipArticle(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
   })
  })
})