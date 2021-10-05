## TESTS EXPLICATION

To make the tests work locally, we need to simulate a chainlink aggregator to get the current value of the DAI/ETH price.  

In the tests, I simulate the different use cases of the BibsStaking contract  

I check if each function operates properly :
* the stake function
* the unstake function
* the issueReward function

All the different possible Revert are also tested.