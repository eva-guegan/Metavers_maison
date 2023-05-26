const NFTMetaverse = artifacts.require("NFTMetaverse");

module.exports = function (deployer) {
  deployer.deploy(NFTMetaverse, 1, 5, 2);
};