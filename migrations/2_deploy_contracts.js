const Dai = artifacts.require("Dai");
const Bibscoin = artifacts.require("Bibscoin");
const BibsStaking = artifacts.require("BibsStaking");

// const tokenAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"; //DAI

module.exports = async function (deployer, _network, accounts) {
  // const dai = await deployer.at()
  await deployer.deploy(Dai, "5000000000000000000000");
  const dai = await Dai.deployed();

  await deployer.deploy(Bibscoin, "5000000000000000000000");
  const bibscoin = await Bibscoin.deployed();

  await deployer.deploy(BibsStaking, dai.address, bibscoin.address);
  const bibsStaking = await BibsStaking.deployed();

  // 1 millions de bibs
  await bibscoin.transfer(bibsStaking.address, "1000000000000000000000");

  // 100 dai
  await dai.transfer(accounts[1], "100000000000000000000");
};