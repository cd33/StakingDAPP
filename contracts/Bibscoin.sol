// SPDX-License-Identifier: MIT 
pragma solidity 0.8.8;
import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
 
contract Bibscoin is ERC20 {
//  constructor(uint256 initialSupply) ERC20('Bibscoin', 'BIBS') {
//    _mint(msg.sender, initialSupply);
//  } 

constructor() ERC20('Bibscoin', 'BIBS') {}

function mint(address recipient, uint256 amount) external {
  _mint(recipient, amount);
}

//  // fonction faucet pour créer des Bibs tokens
//  function faucet(address recipient, uint amount) external {
//    _mint(recipient, amount);
//  }
}