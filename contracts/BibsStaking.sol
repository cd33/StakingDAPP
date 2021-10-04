// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "./Bibscoin.sol";
import "./Dai.sol";

/** @title Bibs Staking. */
contract BibsStaking {
    using SafeMath for uint256;
    Dai public dai;
    Bibscoin public bibscoin;

    AggregatorV3Interface internal priceFeed;

    address[] stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public isStaking;
    mapping(address => uint256) public timestamp;

    event Staked(address user, uint256 amount);
    event Unstaked(address user, uint256 amount);
    event RewardIssued(address user, uint256 amount);

    /** @notice Constructor of the contract.
     * @dev Network: Kovan, Aggregator: DAI/ETH, Address: 0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541
     * @param _daiAddress Address of the Dai token.
     * @param _bibscoinAddress Address of the Bibscoin token.
     * @param _aggregatorAddress Address of the aggregator chainlink.
     */
    constructor(Dai _daiAddress, Bibscoin _bibscoinAddress, address _aggregatorAddress) {
        dai = _daiAddress;
        bibscoin = _bibscoinAddress;
        priceFeed = AggregatorV3Interface(_aggregatorAddress);
    }

    /** @notice Get the current DAI/ETH price.
     * @dev The function uses the chainlink aggregator.
     */
    function getDaiEthPrice() public view returns (int256) {
        (
            uint80 roundID,
            int256 price,
            uint256 startedAt,
            uint256 timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }

    /** @notice Calculate the Reward of Bibscoin token.
     * @dev The function uses the current DAI/ETH rate and calculates the period over which DAIs are stacked.
     */
    function calculateReward() public view returns (uint256) {
        if (stakingBalance[msg.sender] == 0) {
            return 0;
        }
        uint256 daiEthPrice = uint256(getDaiEthPrice());
        uint256 stakingPeriod = (block.timestamp - timestamp[msg.sender]) / (1 seconds);
        return (((stakingBalance[msg.sender] * daiEthPrice) / 1e18) / 1000) * stakingPeriod;
    }

    /** @notice Issue Bibscoin reward to the user. */
    function issueReward() internal {
        uint256 reward = calculateReward();
        require(reward > 0, "No Reward available !");
        require((block.timestamp - timestamp[msg.sender]) > 1 seconds, "Wait at least 1 second to claim again rewards");

        timestamp[msg.sender] = block.timestamp;
        bibscoin.mint(address(this), reward);
        bibscoin.transfer(msg.sender, reward);
        emit RewardIssued(msg.sender, reward);
    }

    /** @notice Stake Dai token.
     * @dev The function transfert Dai from the user to the contract and issue reward if he's already staking.
     * @param _amount The amount of token to stake.
     */
    function stake(uint256 _amount) external {
        require(_amount > 0, "The amount must be positive");
        dai.transferFrom(msg.sender, address(this), _amount);
        if (isStaking[msg.sender]) {
            issueReward();
        }
        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);
        if (!isStaking[msg.sender]) {
            isStaking[msg.sender] = true;
            timestamp[msg.sender] = block.timestamp;
            stakers.push(msg.sender);
        }
        emit Staked(msg.sender, _amount);
    }

    /** @notice Unstake Dai token.
     * @dev The function transfert Dai from the contract to the user and issue reward. If unstake is executed with 0 as amount, it withdraw only the reward.
     * @param _amount The amount of token to unstake.
     */
    function unstake(uint256 _amount) external {
        require(isStaking[msg.sender], "You don't own token staked");
        require(_amount <= stakingBalance[msg.sender], "Insufficient staked amount");

        issueReward();

        if (_amount > 0) {
            stakingBalance[msg.sender] = stakingBalance[msg.sender].sub(_amount);
            dai.transfer(msg.sender, _amount);
        }
        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }

        emit Unstaked(msg.sender, _amount);
    }
}
