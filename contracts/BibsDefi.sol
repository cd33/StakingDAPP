// SPDX-License-Identifier: MIT 
pragma solidity 0.8.7;
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
 
contract BibsDefi {
 IERC20 bibscoin;
 
 constructor(address bibscoinAddress) {
   // Injecter l'address du token Bibscoin à utiliser
   bibscoin = IERC20(bibscoinAddress);
 }
 
 // Fonction qui permet d'effectuer un transfer de bibscoin vers le recipient
 function foo(address recipient, uint amount) external {
   bibscoin.transfer(recipient, amount);
 }
}
