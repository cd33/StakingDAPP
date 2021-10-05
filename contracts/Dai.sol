// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/** @title Dai Token.
 * @dev Homemade Dai token with free mint, Not secure, for test only
 */
contract Dai is ERC20 {
    /** @notice Constructor of the token.
     * @param initialSupply Total number of tokens issued at the initial supply.
     */
    constructor(uint256 initialSupply) ERC20("Dai Stablecoin", "DAI") {
        /** @notice Creates `initialSupply` tokens and assigns them to `msg.sender`, increasing
         * the total supply.
         */
        _mint(msg.sender, initialSupply);
    }

    /** @notice Mint Dai.
     * @param recipient The recipient for the token.
     * @param amount The amount of token.
     */
    function mint(address recipient, uint256 amount) external {
        _mint(recipient, amount);
    }
}
