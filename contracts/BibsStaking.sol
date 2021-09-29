// SPDX-License-Identifier: MIT
pragma solidity 0.8.8;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

import "./Bibscoin.sol";
import "./Dai.sol";

contract BibsStaking is Ownable {
    using SafeMath for uint256;
    Dai public dai;
    Bibscoin public bibscoin;

    address[] stakers;
    mapping(address => uint256) public stakingBalance;
    // INFOS IMPORTANTES ???
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    // Créer un struct comme voting ?
    event Staked(address user, uint256 amount);
    event Unstaked(address user, uint256 amount);
    event RewardIssued(address user, uint256 amount);

    constructor(Dai _daiAddress, Bibscoin _bibscoinAddress) {
        // Injecter l'address du token Bibscoin et Dai à utiliser
        dai = _daiAddress;
        bibscoin = _bibscoinAddress;
    }

    // stake tokens
    function stake(uint256 _amount) external {
        require(_amount > 0, "The amount must be positive");
        dai.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] = stakingBalance[msg.sender].add(_amount);
        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
            hasStaked[msg.sender] = true;
        }
        if (isStaking[msg.sender] != true) {
            isStaking[msg.sender] = true;
        }
        emit Staked(msg.sender, _amount);
    }

    // unstake tokens
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

    // Issuing tokens
    function issueReward() external {
        // for (uint256 i = 0; i < stakers.length; i++) {
        //     // A MODIFIER, ENVOI AU STAKERS DU MEME MONTANT DE BIBS QUE DE LEUR MONTANT EN DAI STAKé
        //     if (stakingBalance[stakers[i]] > 0) {
        //         bibscoin.transfer(stakers[i], stakingBalance[stakers[i]]);
        //     }
        // }
        require(isStaking[msg.sender], "You don't own token staked");
        require(stakingBalance[msg.sender] > 0, "You don't own token");
        uint256 reward = stakingBalance[msg.sender].div(10);
        bibscoin.mint(address(this), reward);
        bibscoin.transfer(msg.sender, reward);
        emit RewardIssued(msg.sender, reward);
    }
}
