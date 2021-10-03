const Dai = artifacts.require("Dai");
const Bibscoin = artifacts.require("Bibscoin");
const ChainlinkDaiTests = artifacts.require("ChainlinkDaiTests");
const BibsStaking = artifacts.require("BibsStaking");

const DaiAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa"; //DAI
const ChainlinkAddress = "0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541";

module.exports = async function (deployer, _network, accounts) {
  // const dai = await Dai.at(DaiAddress) // DELETE
  // await deployer.deploy(Dai, "5000000000000000000000");
  // const dai = await Dai.deployed();  

  await deployer.deploy(Bibscoin);
  const bibscoin = await Bibscoin.deployed();

  // await deployer.deploy(ChainlinkDaiTests);
  // const chainlinkDaiTests = await ChainlinkDaiTests.deployed();

  // await deployer.deploy(BibsStaking, dai.address, bibscoin.address, chainlinkDaiTests.address);
  await deployer.deploy(BibsStaking, DaiAddress, bibscoin.address, ChainlinkAddress);

  // await dai.transfer(accounts[0], 100, { from: accounts[0] });

  // const contractBeforeBalance = await dai.balanceOf(BibsStaking.address);
  // const accountBeforeBalance = await dai.balanceOf(accounts[0]);
  // console.log("contractBeforeBalance: " + contractBeforeBalance.toString());
  // console.log("accountBeforeBalance: " + accountBeforeBalance.toString());

  // 1000 dai
  // await dai.transfer(accounts[1], "1000000000000000000000");
};