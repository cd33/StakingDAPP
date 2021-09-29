// SPDX-License-Identifier: MIT 
pragma solidity 0.8.8;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
 
contract Dai is ERC20 {
//  constructor() ERC20('Dai Stablecoin', 'DAI') {}
 constructor(uint256 initialSupply) ERC20('Dai Stablecoin', 'DAI') {
    _mint(msg.sender, initialSupply);
 }
}