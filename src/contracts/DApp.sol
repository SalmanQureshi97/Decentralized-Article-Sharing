pragma solidity ^0.5.0;

contract DApp {
  
  uint public articleCount = 0;
  mapping(uint => Article) public articles;
  

  struct Article {
    uint id;
    string hash;
    string description;
    string keyword1;
    string keyword2;
    string keyword3;
    uint tipAmount;
    address payable author;
  }

  event ArticleCreated (
    uint id,
    string hash,
    string description,
    string keyword1,
    string keyword2,
    string keyword3,
    uint tipAmount,
    address payable author
  );

  event ArticleTip(
    uint id,
    string hash,
    string description,
    string keyword1,
    string keyword2,
    string keyword3,
    uint tipAmount,
    address payable author
  );

  function uploadArticle(string memory _articleHash,string memory _description,string memory _keyword1,string memory _keyword2,string memory _keyword3) public {

    require(bytes(_articleHash).length > 0);
    require(msg.sender != address(0x0));
    require(bytes(_description).length > 0);
    require(bytes(_keyword1).length > 0);
    require(bytes(_keyword2).length > 0);
    require(bytes(_keyword3).length > 0);

    articleCount++;
    articles[articleCount] = Article(articleCount,_articleHash,_description,_keyword1,_keyword2,_keyword3,0,msg.sender);


    emit ArticleCreated(articleCount,_articleHash,_description,_keyword1,_keyword2,_keyword3,0,msg.sender);
  }

  function tipArticle(uint _id) public payable {

    require(_id > 0 && _id <= articleCount);


    Article memory _article = articles[_id];

    address payable _author = _article.author;

    _author.transfer(msg.value);

    _article.tipAmount = _article.tipAmount + msg.value;

    articles[_id] = _article;
 
    emit ArticleTip(_id, _article.hash, _article.description, _article.keyword1, _article.keyword2,  _article.keyword3,  _article.tipAmount, _author);
  }

}