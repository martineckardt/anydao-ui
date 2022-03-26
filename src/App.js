import React, { useState } from "react";
import "./App.css";
import useConnect from './hooks/useConnect';
import substr from "./utils/substr";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import logo_dark from './assets/logo_dark.svg';
import logo_light from './assets/logo_light.svg';


const App = () => {
  const [chains, setChains] = useState({
    "Fuji": {
      chainBalance: 13000,
      status: "disconnected",
    },
    "Rinkeby": {
      chainBalance: 1134,
      status: "disconnected",
    }
  });

  const {
    SignOut,
    SignIn,
    currentAccount,
    loading
  } = useConnect();

  const handleChainVote = (chainName, newStatus) => {

    setChains(prevChains => {
      var chains = { ...prevChains };


      switch (newStatus) {
        case "connected":
          Object.values(chains)
            .filter(chain => chain.status == "connected")
            .map(chain => chain.status = "disconnected");
          chains[chainName].status = newStatus;
          break;
        case "approved":
          // Send Transaction to Chain

          // If successfull
          chains[chainName].status = newStatus;
          break;
        case "denied":
          // Send Transaction to Chain

          // If successfull
          chains[chainName].status = newStatus;
          break;
      }

      return chains;
    });
  }

  return (<>
    <div className="container-xl">
      <Header onWalletConnectClick={loading ? () => SignOut() : () => SignIn()} loading={loading} currentAccount={currentAccount} />
      <ProposalDetailView chains={chains} handleChainVote={handleChainVote} />
    </div>
    <Footer />
  </>);
};

function Header({ onWalletConnectClick, loading, currentAccount }) {
  return (
    <div className="row py-3">
      <p className="col-md-10">anyDAO</p>
      <p className="col-md-2">
        <button type="button" className="btn btn-outline-light" onClick={onWalletConnectClick}>
          {loading ? substr(currentAccount) : 'Connect Wallet'}
        </button>
      </p>
    </div>
  )
}

function ProposalDetailView({ chains, handleChainVote }) {
  return (
    <div className="my-5">
      <p>Back</p>
      <h4>anyDAO</h4>
      <main className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h3>VOTE to make $1INCH deflationary!</h3>
              <p>Implementing a strong deflationary mechanism to the 1inch token.</p>
              <p>Removing Single-Asset-Staking & Farming Completely. Replace with a deflationary mechanism.</p>
              <p>This eliminates sell pressure from the stakers as well, and everybody is incentivised as the supply decreases = more valuable… Holders will be more committed to hold the token, instead of farming/staking and then selling the token, which decreases the value of the token.</p>
            </div>
          </div>

          {Object.entries(chains).map(([chainName, { chainBalance, status }]) => <ChainVoter
            key={chainName}
            chainName={chainName}
            chainBalance={chainBalance}
            status={status}
            onApproveClick={() => handleChainVote(chainName, "approved")}
            onDenyClick={() => handleChainVote(chainName, "denied")}
            onConnectClick={() => handleChainVote(chainName, "connected")}
          />)}

        </div>

        <div className="col-md-4">
          <p>Proposal Name</p>
          <div>
            <p>Crosschain results</p>
            <div className="row">
              <div className="col-md-6">
                <p>Approve 99%</p>
                <p>123.423</p>
              </div>
              <div className="col-md-6">
                <p>Deny 99%</p>
                <p>523</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ChainVoter({ status, chainName, chainBalance, onConnectClick, onApproveClick, onDenyClick }) {
  return (
    <>
      <div className="card mt-2">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-8">
              <h3>Vote from {chainName}</h3>
              <p>Balance at snapshot {chainBalance}</p>
            </div>
            <div className="col col-4 text-end">
              {
                {
                  'disconnected': (<>
                    <button type="button" className="btn btn-outline-light" onClick={onConnectClick}>Connect to {chainName}</button>
                  </>),
                  'connected': (<>
                    <button type="button" className="btn btn-outline-success me-2" onClick={onApproveClick}>Approve</button>
                    <button type="button" className="btn btn-outline-danger" onClick={onDenyClick}>Deny</button>
                  </>),
                  'approved': <button
                    type="button"
                    className="btn btn-outline-success me-2"
                  >
                    Approved
                  </button>,
                  'denied': <button
                    type="button"
                    className="btn btn-outline-danger me-2"
                  >
                    Denied
                  </button>
                }[status]
              }

            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  )
}

function Footer() {
  return (
    <div className="container-fluid py-2 bg-light text-dark">
      <div className="row">
        <span className="col-md-5 text-center">anyDAO 2022 built for the Avalanche Sumit Hackathon</span>
        <span className="col-md-2 text-center"><img src={logo_dark} alt="anyDAO" style={{ height: 15 + 'px' }} /></span>
        <span className="col-md-5 text-center">Powered by Layer Zero, Coinbase and Covalent</span>
      </div>
    </div>
  )
}

export default App;