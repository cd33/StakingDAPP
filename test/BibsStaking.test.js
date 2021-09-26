const { BN, expectRevert } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');

function readable(val) {
    return web3.utils.toWei(val, 'ether')
}

const Dai = artifacts.require("Dai");
const Bibscoin = artifacts.require("Bibscoin");
const BibsStaking = artifacts.require("BibsStaking");
const _initialsupply = readable("5000000");
const _decimals = new BN(18);

contract('BibsStaking', function (accounts) {
    let dai, bibscoin, bibsStaking;
    const owner = accounts[0];
    const investor = accounts[1];

    describe("Bibs Staking Tests", async () => {
        beforeEach(async function () {
            dai = await Dai.new(_initialsupply);
            bibscoin = await Bibscoin.new(_initialsupply);
            bibsStaking = await BibsStaking.new(dai.address, bibscoin.address);

            await bibscoin.transfer(bibsStaking.address, _initialsupply, { from: owner })

            await dai.transfer(investor, readable("100"), { from: owner })
        });

        describe("DAI", async () => {
            it('a un nom', async function () {
                expect(await dai.name()).to.equal("Dai Stablecoin");
            });

            it('a un symbole', async function () {
                expect(await dai.symbol()).to.equal("DAI");
            });

            it('a une valeur décimal', async function () {
                expect(await dai.decimals()).to.be.bignumber.equal(_decimals);
            });
        })

        describe("Bibscoin", async () => {
            it('a un nom', async function () {
                expect(await bibscoin.name()).to.equal("Bibscoin");
            })

            it('a un symbole', async function () {
                expect(await bibscoin.symbol()).to.equal("BIBS");
            });

            it('a une valeur décimal', async function () {
                expect(await bibscoin.decimals()).to.be.bignumber.equal(_decimals);
            });
        })

        describe("Bibs Staking", async () => {
            it("bibscoin balance", async function () {
                expect(await bibscoin.balanceOf(bibsStaking.address)).to.be.bignumber.equal(_initialsupply);
            })

            it("dai balance", async function () {
                expect(await dai.balanceOf(investor)).to.be.bignumber.equal(readable("100"));
            })
        })

        describe("Bibs Staking", async () => {
            beforeEach(async function () {
                await dai.approve(bibsStaking.address, readable("10"), { from: investor });
                await bibsStaking.stakeTokens(readable("10"), { from: investor });
            });

            it("Stake", async function () {
                const afterStakeDaiInvestor = await dai.balanceOf(investor);
                expect(afterStakeDaiInvestor).to.be.bignumber.equal(readable("90"));

                const afterStakeDaiBibsStaking = await dai.balanceOf(bibsStaking.address);
                expect(afterStakeDaiBibsStaking).to.be.bignumber.equal(readable("10"));

                const afterStakeFarmInvestor = await bibsStaking.stakingBalance(investor);
                expect(afterStakeFarmInvestor).to.be.bignumber.equal(readable("10"));

                const afterStakeFarmStaked = await bibsStaking.hasStaked(investor);
                expect(afterStakeFarmStaked).to.be.true;
            });

            it("Issuing", async function () {
                const beforeIssuing = await bibscoin.balanceOf(investor)
                expect(beforeIssuing).to.be.bignumber.equal("0");

                await bibsStaking.issueTokens({ from: owner });

                const afterIssuing = await bibscoin.balanceOf(investor)
                expect(afterIssuing).to.be.bignumber.equal(readable("10"));
            });

            it("REVERT: issueTokens() is onlyOwner", async function () {
                await expectRevert(bibsStaking.issueTokens({ from: investor }), "Ownable: caller is not the owner");
            })

            it("Unstake", async function () {
                const beforeUnstake = await bibsStaking.stakingBalance(investor)
                expect(beforeUnstake).to.be.bignumber.equal(readable("10"));

                const beforeUnstakeDai = await dai.balanceOf(investor)
                expect(beforeUnstakeDai).to.be.bignumber.equal(readable("90"));

                const beforeUnstakeContract = await dai.balanceOf(bibsStaking.address)
                expect(beforeUnstakeContract).to.be.bignumber.equal(readable("10"));

                const beforeIsStaking = await bibsStaking.isStaking(investor);
                expect(beforeIsStaking).to.be.true

                await bibsStaking.unstakeTokens(readable("10"), { from: investor });

                const afterUnstake = await bibsStaking.stakingBalance(investor)
                expect(afterUnstake).to.be.bignumber.equal(readable("0"));

                const afterUnstakeDai = await dai.balanceOf(investor)
                expect(afterUnstakeDai).to.be.bignumber.equal(readable("100"));

                const afterUnstakeContract = await dai.balanceOf(bibsStaking.address)
                expect(afterUnstakeContract).to.be.bignumber.equal(readable("0"));

                const afterIsStaking = await bibsStaking.isStaking(investor);
                expect(afterIsStaking).to.be.false
            });

            it("REVERT: unstakeTokens() amount negative", async function () {
                await expectRevert(bibsStaking.unstakeTokens(readable("0"), { from: investor }), "The amount must be positive");
            })

            it("REVERT: unstakeTokens() isStaking false", async function () {
                await bibsStaking.unstakeTokens(readable("10"), { from: investor });
                await expectRevert(bibsStaking.unstakeTokens(readable("10"), { from: investor }), "You don't own token staked");
            })

            it("REVERT: unstakeTokens() amount too big", async function () {
                await expectRevert(bibsStaking.unstakeTokens(readable("100"), { from: investor }), "You don't own as many tokens");
            })
        })
    });
});