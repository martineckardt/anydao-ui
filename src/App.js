import React, { useState } from "react";
import "./App.css";
import useConnect from './hooks/useConnect';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    const {
      connect,
      handleRequestAccounts,
      SignOut,
      SignIn,
      currentAccount,
      loading
    } = useConnect()


    this.state = {
      chains: {
        "Fuji": {
          chainBalance: 13000,
          status: "disconnected",
        },
        "Rinkeby": {
          chainBalance: 1134,
          status: "disconnected",
        }
      }
    };

    this.handleChainVote = this.handleChainVote.bind(this);
  }

  handleChainVote(chainName, newStatus) {
    console.log("handle chain vote");
    var chains = { ...this.state.chains };

    // Reset status of unvoted (connected) chains
    if (newStatus === "connected")
      Object.values(chains)
        .filter(chain => chain.status == "connected")
        .map(chain => chain.status = "disconnected");

    chains[chainName].status = newStatus;
    this.setState({ chains })
  }

  render() {
    return (
      <div className="container">
        <Header onWalletConnectClick={() => console.log("Wallet Connect clicked!")} />
        <ProposalDetailView chains={this.state.chains} handleChainVote={this.handleChainVote} />
      </div>
    );
  }
}

function Header({ onWalletConnectClick }) {
  return (
    <div className="row py-3">
      <p className="col-md-10">anyDAO</p>
      <p className="col-md-2">
        <button type="button" className="btn btn-outline-dark" onClick={onWalletConnectClick}>
          Connect Wallet
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
          <div className="card bg-light">
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
      <div className="card bg-light mt-2">
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
                    <button type="button" className="btn btn-outline-dark" onClick={onConnectClick}>Connect to {chainName}</button>
                  </>),
                  'connected': (<>
                    <button type="button" className="btn btn-outline-dark me-2" onClick={onApproveClick}>Approve</button>
                    <button type="button" className="btn btn-outline-dark" onClick={onDenyClick}>Deny</button>
                  </>),
                  'approved': <button
                    type="button"
                    className="btn btn-outline-dark me-2"
                  >
                    Approved
                  </button>,
                  'denied': <button
                    type="button"
                    className="btn btn-outline-dark me-2"
                  >
                    Denied
                  </button>
                }[status]
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

