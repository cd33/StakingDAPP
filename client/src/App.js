import React, { useEffect, useState } from "react";
import Dai from "./contracts/Dai.json";
import Bibscoin from "./contracts/Bibscoin.json";
import BibsStaking from "./contracts/BibsStaking.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import Content from "./components/Content";
import { Spinner } from 'react-bootstrap';

import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [dai, setDai] = useState(null);
  const [daiBalance, setDaiBalance] = useState(null);
  const [daiInput, setDaiInput] = useState(null);
  const [bibscoinBalance, setBibscoinBalance] = useState(null);
  const [bibsStaking, setBibsStaking] = useState(null);
  const [bibsStakingBalance, setBibsStakingBalance] = useState(null);
  const [allowance, setAllowance] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [contentModal, setContentModal] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        web3.eth.handleRevert = true;
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // web3.eth.handleRevert = true;

        if (window.ethereum) {
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccounts({ accounts });
            window.location.reload();
          });

          window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
        }

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();

        if (networkId !== 1337 && networkId !== 42) {
          handleModal("Problem Network", "Please Switch to the Kovan Network");
          // alert("Please Switch to the Kovan Network");
          return;
        }

        // Load Dai
        const daiData = Dai.networks[networkId];
        const dai = new web3.eth.Contract(Dai.abi, daiData && daiData.address);
        setDai(dai);
        let daiBalance = await dai.methods.balanceOf(accounts[0]).call();
        setDaiBalance(daiBalance);

        // Load Bibscoin
        const bibscoinData = Bibscoin.networks[networkId];
        const bibscoin = new web3.eth.Contract(Bibscoin.abi, bibscoinData && bibscoinData.address);
        let bibscoinBalance = await bibscoin.methods.balanceOf(accounts[0]).call();
        setBibscoinBalance(bibscoinBalance);

        // Load BibsStaking
        const bibsStakingData = BibsStaking.networks[networkId];
        const bibsStaking = new web3.eth.Contract(BibsStaking.abi, bibsStakingData && bibsStakingData.address);
        setBibsStaking(bibsStaking);
        let bibsStakingBalance = await bibsStaking.methods.stakingBalance(accounts[0]).call();
        setBibsStakingBalance(bibsStakingBalance);

        // Check the allowance
        await dai.methods.allowance(accounts[0], bibsStaking._address).call().then(num => setAllowance(Number(num) !== 0))

        // Subscribe to the contract states to update the front states
        web3.eth.subscribe('newBlockHeaders', async (err, res) => {
          if (!err) {
            await dai.methods.balanceOf(accounts[0]).call().then((res) => setDaiBalance(res));
            await bibscoin.methods.balanceOf(accounts[0]).call().then((res) => setBibscoinBalance(res));
            await bibsStaking.methods.stakingBalance(accounts[0]).call().then((res) => setBibsStakingBalance(res));
          }
        });

        // Set web3, accounts, and the contracts to the state, and then proceed
        setWeb3(web3);
        setAccounts(accounts);
      } catch (error) {
        // Catch any errors for any of the above operations.
        handleModal("Error", `Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    }
    init();
  }, []);

  // EVENTS
  useEffect(() => {
    if (bibsStaking !== null && web3 !== null) {
      bibsStaking.events.Staked({fromBlock: 0})
      .on('data', event => handleModal("Transaction Approuved", `${web3.utils.fromWei(event.returnValues.amount, 'Ether')} DAI staked`))
      .on('error', err => handleModal("Error", err.message))

      bibsStaking.events.Unstaked({fromBlock: 0})
      .on('data', event => event.returnValues.amount !== "0" && handleModal("Transaction Approuved", `${web3.utils.fromWei(event.returnValues.amount, 'Ether')} DAI unstaked`))
      .on('error', err => handleModal("Error", err.message))
  
      bibsStaking.events.RewardIssued({fromBlock: 0})
      .on('data', event => handleModal("Transaction Approuved", `${web3.utils.fromWei(event.returnValues.amount, 'Ether')} BIBS issued`))
      .on('error', err => handleModal("Error", err.message))
    }
  }, [bibsStaking, web3])

  // useEffect(() => {
  //   if (dai !== null && web3 !== null) {
  //     dai.events.Transfer({fromBlock: 0})
  //     .on('data', event => handleModal("Transaction Approuved", `${web3.utils.fromWei((event.returnValues.value).toString(), 'Ether')} DAI transfered`))
  //     .on('error', err => handleModal("Error", err.message))
  //   }
  // }, [dai, web3])

  const allow = async () => {
    await dai.methods.approve(bibsStaking._address, -1).send({ from: accounts[0] }).then((res) => {
      setAllowance(res.status === true);
    });
  }

  const stake = async () => {
    try {
      const daiAmount = web3.utils.toWei(daiInput.value, 'Ether');
      await bibsStaking.methods.stake(daiAmount).send({ from: accounts[0] });
    }
    catch (error) {
      console.log(error.message);
    }
  };

  const unstake = async () => {
    try {
      const daiAmount = web3.utils.toWei(daiInput.value, 'Ether');
      await bibsStaking.methods.unstake(daiAmount).send({ from: accounts[0] });
    } catch (error) {
      console.log(error.message);
    }
  }

  const issueReward = async () => {
    try {
      await bibsStaking.methods.unstake(0).send({ from: accounts[0] })
    } catch (error) {
      console.log(error.message)
    }
  }

  const mintDai = async () => {
    try {
      await dai.methods.mint(accounts[0], web3.utils.toWei("1000", 'Ether')).send({ from: accounts[0] });
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleModal = (title, content) => {
    setTitleModal(title);
    setContentModal(content);
    setModalShow(true);
  }

  if (!web3) {
    return (
      <div className="App" style={{ marginTop: 50 }}>
        <Modal modalShow={modalShow} setModalShow={setModalShow} title={titleModal} content={contentModal} />
        <Spinner animation="border" variant="dark" style={{ marginBottom: 20 }} />
        <h3>Loading Web3, accounts, and contract...</h3>
      </div>
    )
  }
  return (
    <div className="App" style={{ backgroundColor: '#EFF0D1', minHeight: "100vh" }}>
      <Navbar accounts={accounts} />
      <div style={{ paddingTop: 100 }}>
        <Modal modalShow={modalShow} setModalShow={setModalShow} title={titleModal} content={contentModal} />
        <Content
          web3={web3}
          daiBalance={daiBalance}
          bibscoinBalance={bibscoinBalance}
          bibsStakingBalance={bibsStakingBalance}
          setDaiInput={setDaiInput}
          stake={stake}
          unstake={unstake}
          issueReward={issueReward}
          allowance={allowance}
          allow={allow}
          mintDai={mintDai}
        />
      </div>
    </div>
  );
}

export default App;
