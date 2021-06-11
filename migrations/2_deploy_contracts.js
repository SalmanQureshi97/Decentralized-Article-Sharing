const DAPP = artifacts.require("DApp");

module.exports = function(deployer) {
  // Code goes here...
  deployer.deploy(DAPP)
};