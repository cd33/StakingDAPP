// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

contract ChainlinkDaiTests is AggregatorV3Interface, Ownable {

    constructor() {}

    function decimals() override external pure returns (uint8) {
        return 8;
    }

    function description() override external pure returns (string memory) {
        return "ChainlinkDaiTests";
    }

    function version() override external pure returns (uint256) {
        return 1;
    }

  
    function getRoundData(uint80 _roundId) override external pure returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) {
        // return (_roundId, value * 10 ** 8, 1, 1, 1);
        return (_roundId, 10**14, 1, 1, 1);
    }

    function latestRoundData() override external pure returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound) {
        // return (0, value * 10 ** 8, 1, 1, 1);
        return (0, 10**14, 1, 1, 1);
    }
}