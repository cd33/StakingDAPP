## `BibsStaking`






### `constructor(contract Dai _daiAddress, contract Bibscoin _bibscoinAddress, address _aggregatorAddress)` (public)

Constructor of the contract.


Network: Kovan, Aggregator: DAI/ETH, Address: 0x22B58f1EbEDfCA50feF632bD73368b2FdA96D541


### `getDaiEthPrice() → int256` (public)

Get the current DAI/ETH price.


The function uses the chainlink aggregator.

### `calculateReward() → uint256` (public)

Calculate the Reward of Bibscoin token.


The function uses the current DAI/ETH rate and calculates the period over which DAIs are stacked.

### `issueReward()` (internal)

Issue Bibscoin reward to the user.



### `stake(uint256 _amount)` (external)

Stake Dai token.


The function transfert Dai from the user to the contract and issue reward if he's already staking.


### `unstake(uint256 _amount)` (external)

Unstake Dai token.


The function transfert Dai from the contract to the user and issue reward. If unstake is executed with 0 as amount, it withdraw only the reward.



### `Staked(address user, uint256 amount)`





### `Unstaked(address user, uint256 amount)`





### `RewardIssued(address user, uint256 amount)`







