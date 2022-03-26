import React, { useState } from "react";
import "./App.css";
import useConnect from './hooks/useConnect';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import ChainList from "./components/ChainList";
import ProposalDetails from "./components/ProposalDetails";
import ProposalResults from "./components/ProposalResults";

import logo_light from './assets/logo_light.svg';
import { isRequestEthereumAccountsResponse } from "@coinbase/wallet-sdk/dist/relay/Web3Response";


const App = () => {
  const {
    SignOut,
    SignIn,
    currentAccount,
    loading,
    isFuji,
    isRike,
    connectFuji,
    connectRick
  } = useConnect();


  const [chains, setChains] = useState({
    "Fuji": {
      chainBalance: 13000,
      status: isFuji ? "connected" : "disconnected",
      vote: 'null',
    },
    "Rinkeby": {
      chainBalance: 1134,
      status: isRike ? "connected" : "disconnected",
      vote: 'null',
    }
  });

  const handleChainVote = (chainName, newStatus) => {
    console.log("isFuji", isFuji);
    console.log("isRike", isRike);

    setChains(async prevChains => {
      var chains = { ...prevChains };

      switch (newStatus) {
        case "connected":
          // Connect to other chain
          console.log("isFuji 2", isFuji);

          if (chainName === "Fuji" && isFuji === false) {
            return await connectFuji().then(() => {
              console.log("Change to fuji");
              // If successfull => mark other chain as disconnected and new chain as connected
              Object.values(chains)
                .filter(chain => chain.status == "connected")
                .map(chain => chain.status = "disconnected");
              chains[chainName].status = newStatus;
              return chains;
            })
          }
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

      //return chains;
    });
  }

  return (<>
    <div className="container-xl">
      <Header onWalletConnectClick={loading ? () => SignOut() : () => SignIn()} loading={loading} currentAccount={currentAccount} />
      <ProposalDetailView chains={chains} handleChainVote={handleChainVote} />
    </div>
    <Footer />
    <ToastContainer></ToastContainer>
  </>);
};


function ProposalDetailView({ chains, handleChainVote }) {
  return (
    <div className="my-5">
      <p>Back</p>
      <h5>anyDAO</h5>
      <main className="row">
        <div className="col-md-8">
          <ProposalDetails />
          {JSON.stringify(chains)}
          <ChainList chains={chains} handleChainVote={handleChainVote} />
        </div>
        <div className="col-md-4">
          <ProposalResults />
        </div>
      </main>
    </div>
  );
}

export default App;