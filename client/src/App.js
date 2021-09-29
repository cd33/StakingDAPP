import React, { useEffect, useState } from "react";
import Dai from "./contracts/Dai.json";
import Bibscoin from "./contracts/Bibscoin.json";
import BibsStaking from "./contracts/BibsStaking.json";
import getWeb3 from "./getWeb3";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import { Spinner } from 'react-bootstrap';

import "./App.css";

// VIDEO 2h https://www.youtube.com/watch?v=CgXQC4dbGUE&list=PLqqTsZSw6kjlo3ZIWoWcM31E_F-17AWEH&index=5

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [dai, setDai] = useState(null);
  const [daiBalance, setDaiBalance] = useState(null);
  const [daiInput, setDaiInput] = useState(null);
  const [daiInputErr, setDaiInputErr] = useState(null);
  const [bibscoin, setBibscoin] = useState(null);
  const [bibscoinBalance, setBibscoinBalance] = useState(null);
  const [bibsStaking, setBibsStaking] = useState(null);
  const [bibsStakingBalance, setBibsStakingBalance] = useState(null);

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        web3.eth.handleRevert = true;
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        if (window.ethereum) {
          window.ethereum.on('accountsChanged', (accounts) => {
            setAccounts({ accounts });
            window.location.reload();
          });

          window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
        }

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();

        // Load Dai
        const daiData = Dai.networks[networkId];
        const dai = new web3.eth.Contract(Dai.abi, daiData && daiData.address);
        setDai(dai);
        let daiBalance = await dai.methods.balanceOf(accounts[0]).call();
        setDaiBalance(daiBalance);

        // Load Bibscoin
        const bibscoinData = Bibscoin.networks[networkId];
        const bibscoin = new web3.eth.Contract(Bibscoin.abi, bibscoinData && bibscoinData.address);
        setBibscoin(bibscoin);
        let bibscoinBalance = await bibscoin.methods.balanceOf(accounts[0]).call();
        setBibscoinBalance(bibscoinBalance);

        // Load BibsStaking
        const bibsStakingData = BibsStaking.networks[networkId];
        const bibsStaking = new web3.eth.Contract(BibsStaking.abi, bibsStakingData && bibsStakingData.address);
        setBibsStaking(bibsStaking);
        let bibsStakingBalance = await bibsStaking.methods.stakingBalance(accounts[0]).call();
        setBibsStakingBalance(bibsStakingBalance);


        // Set web3, accounts, and the contracts to the state, and then proceed
        setWeb3(web3);
        setAccounts(accounts);
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    }
    init();
  }, []);

  const stake = async () => {
    // setLoading(true)
    const daiAmount = web3.utils.toWei(daiInput.value, 'Ether');
    try {
      dai.methods.approve(bibsStaking._address, daiAmount).send({ from: accounts[0] }).on('transactionHash', (hash) => {
        bibsStaking.methods.stake(daiAmount).send({ from: accounts[0] }).on('transactionHash', (hash) => {
          // setLoading(false);
          window.location.reload();
        })
      })
    }
    catch (error) {
      // setDaiInputErr(error.message);
      console.log(error.message)
    }
  };

  // EVENTS
  // useEffect(() => {
  //   if (bibsStaking !== null) {
  //     bibsStaking.events.Unstaked({fromBlock: 0})
  //     .on('data', event => alert(`Transaction Approuved ${web3.utils.fromWei(event.returnValues.amount, 'Ether')} DAI`))
  //     .on('error', err => alert(err.message))   
  //   }
  // }, [bibsStaking])

  const unstake = async () => {
    try {
      const daiAmount = web3.utils.toWei(daiInput.value, 'Ether');
      await bibsStaking.methods.unstake(daiAmount).send({ from: accounts[0] }, function (err) {
        if (err) {
          if (err.message.length < 100) {
            alert(err.message)
            window.location.reload();
          } else {
            alert(err.message.substring(149, 177));
            window.location.reload();
          }
        } else {
          alert("Transaction Approuved");
          window.location.reload();
        }
      })
    } catch (error) {
      // setDaiInputErr(error.message);
      console.log(error.message);
    }
  }

  const issueReward = async () => {
    try {
      await bibsStaking.methods.issueReward().send({ from: accounts[0] }).on('transactionHash', (hash) => {
        window.location.reload();
      })
    } catch (error) {
      // setDaiInputErr(error.message);
      console.log(error.message)
    }
  }

  // chainlink: issuing proportionel prix actuel et quantité stakée
  // AJOUTER EVENTS AU CONTRACT ET LES LISTENERS ICI
  // MESSAGES D'ERREURS, Capter seulement le petit message et changer les alert en modal jolies
  // utiliser le vrai DAI

  if (!web3) {
    return (
      <div className="App" style={{ marginTop: 50 }}>
        <Spinner animation="border" variant="dark" style={{ marginBottom: 20 }} />
        <h3>Loading Web3, accounts, and contract...</h3>
      </div>
    )
  }
  return (
    <div className="App" style={{ backgroundColor: '#EFF0D1', minHeight: "100vh" }}>
      <Navbar accounts={accounts} />
      <div style={{ paddingTop: 100 }}>
        <Content
          web3={web3}
          daiBalance={daiBalance}
          bibscoinBalance={bibscoinBalance}
          bibsStakingBalance={bibsStakingBalance}
          setDaiInput={setDaiInput}
          stake={stake}
          unstake={unstake}
          issueReward={issueReward}
        />
      </div>
    </div>
  );
}

export default App;
