// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

import "./Bibscoin.sol";
import "./Dai.sol";

contract BibsStaking is Ownable {
    using SafeMath for uint256;
    Dai public dai;
    Bibscoin public bibscoin;

    AggregatorV3Interface internal priceFeed;

    address[] stakers;
    mapping(address => uint256) public stakingBalance;
    // INFOS IMPORTANTES ???
    mapping(address => bool) public isStaking;
    mapping(address => uint256) public timestamp; 

    // Créer un struct comme voting ?
    event Staked(address user, uint256 amount);
    event Unstaked(address user, uint256 amount);
    event RewardIssued(address user, uint256 amount);

    /**
     * Network: Kovan
     * Aggregator: DAI/ETH
     * Address: 0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541
     */
    constructor(Dai _daiAddress, Bibscoin _bibscoinAddress, address _address) {
        // Injecter l'address du token Bibscoin et Dai à utiliser
        dai = _daiAddress;
        bibscoin = _bibscoinAddress;
        priceFeed = AggregatorV3Interface(_address);
    }

    // stake tokens
    function stake(uint256 _amount) external {
        require(_amount > 0, "The amount must be positive");
        dai.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);
        if (!isStaking[msg.sender]) {
            isStaking[msg.sender] = true;
            timestamp[msg.sender] = block.timestamp;
            stakers.push(msg.sender);
        }
        emit Staked(msg.sender, _amount);
    }

    function calculateReward() public view returns (uint256) {
        if (stakingBalance[msg.sender] == 0) {
            return 0;
        }
        uint256 daiEthPrice = uint256(getDaiEthPrice());
        uint256 stakingPeriod = (block.timestamp - timestamp[msg.sender]) / (1 seconds);
        return (((stakingBalance[msg.sender] * daiEthPrice) / 1e18) / 1000) * stakingPeriod;
    }

    function getDaiEthPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }

    // Issuing tokens
    function issueReward() public {
        require(isStaking[msg.sender], "You don't own token staked");
        uint256 reward = calculateReward();
        require(reward > 0, "No Reward available !");
        require((block.timestamp - timestamp[msg.sender]) > 1 seconds, "Wait at least 1 second to claim again rewards");

        timestamp[msg.sender] = block.timestamp;
        bibscoin.mint(address(this), reward);
        bibscoin.transfer(msg.sender, reward);
        emit RewardIssued(msg.sender, reward);
    }

    // unstake tokens, SECURITE
    function unstake(uint256 _amount) external {
        require(_amount > 0, "The amount must be positive");
        require(isStaking[msg.sender], "You don't own token staked");
        require(stakingBalance[msg.sender] >= _amount, "You don't own as many tokens");
        stakingBalance[msg.sender] = stakingBalance[msg.sender].sub(_amount);
        if (stakingBalance[msg.sender] == 0) {
            isStaking[msg.sender] = false;
        }
        dai.transfer(msg.sender, _amount);
        emit Unstaked(msg.sender, _amount);
    }
}
