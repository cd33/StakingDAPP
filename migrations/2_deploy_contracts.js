const Bibscoin = artifacts.require("Bibscoin");
const BibsDefi = artifacts.require("BibsDefi");

module.exports = async function (deployer, _network, accounts) {
  await deployer.deploy(Bibscoin);
  const bibscoin = await Bibscoin.deployed();
  deployer.deploy(BibsDefi, bibscoin.address);

  // const bibscoin = await Bibscoin.at(tokenAddress);
  // await deployer.deploy(BibsDefi, tokenAddress);

  // const bibsDefi = await BibsDefi.deployed();
  // await bibscoin.transfer(bibsDefi.address, 100, { from: accounts[0] });

  // const contractBeforeBalance = await bibscoin.balanceOf(bibsDefi.address);
  // const accountBeforeBalance = await bibscoin.balanceOf(accounts[0]);
  // console.log("contractBeforeBalance: " + contractBeforeBalance.toString());
  // console.log("accountBeforeBalance: " + accountBeforeBalance.toString());

  // await bibsDefi.foo(accounts[0], 100);

  // const contractAfterBalance = await bibscoin.balanceOf(bibsDefi.address);
  // const accountAfterBalance = await bibscoin.balanceOf(accounts[0]);
  // console.log("contractAfterBalance: " + contractAfterBalance.toString());
  // console.log("accountAfterBalance: " + accountAfterBalance.toString());
};