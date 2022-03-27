import React, { useState } from "react";
import "./App.css";
import useConnect from './hooks/useConnect';
import useCastVote from './hooks/useCastVote';
import useERC20Contract from './hooks/useERC20Contract';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import ChainVoter from "./components/ChainVoter";
import ProposalDetails from "./components/ProposalDetails";
import ProposalResults from "./components/ProposalResults";

const FUJI_CONTRACT = "0x05180cE2471b2C320D1F9C17c2D25E7E98380820";
const RIKE_CONTRACT = "0x0A197D67Fa291eA4B6c1010a97b36cFf5C31453F";

const App = () => {
  const {
    SignOut,
    SignIn,
    currentAccount,
    loading,
    isFuji,
    isRike,
    connectFuji,
    connectRike
  } = useConnect();

  const { } = useERC20Contract

  const [fuji, setFuji] = useState({
    chainBalance: 130000,
    status: isFuji ? "connected" : "disconnected",
    vote: 'null',
    approvedCount: 80345,
    deniedCount: 12564,
  });

  const [rike, setRike] = useState({
    chainBalance: 100134,
    status: isRike ? "connected" : "disconnected",
    vote: 'null',
    approvedCount: 72545,
    deniedCount: 34684,
  });

  return (<>
    <div className="container-xl flex-shrink-0">
      <Header onWalletConnectClick={loading ? () => SignOut() : () => SignIn()} loading={loading} currentAccount={currentAccount} />
      <ProposalDetailView
        fuji={fuji}
        isFuji={isFuji}
        connectFuji={connectFuji}
        setFuji={setFuji}

        rike={rike}
        isRike={isRike}
        connectRike={connectRike}
        setRike={setRike}
      />
    </div>
    <ToastContainer></ToastContainer>
    <Footer />
  </>);
};


function ProposalDetailView({ fuji, setFuji, rike, setRike }) {
  const {
    isFuji,
    isRike,
    connectFuji,
    connectRike
  } = useConnect();

  const { castVote } = useCastVote()

  return (
    <div className="mt-4">
      <p>Back</p>
      <h5>anyDAO</h5>
      <main className="row">
        <div className="col-md-8">
          <ProposalDetails />

          <ChainVoter
            chainName={"Fuji"}
            chainBalance={fuji.chainBalance}
            isConnected={isFuji}
            vote={fuji.vote}
            onConnectClick={connectFuji}
            onApproveClick={() => {
              setFuji(prevState => ({ ...prevState, vote: "waiting" }));
              // Vote Approve on Rike
              castVote(FUJI_CONTRACT)
                .then(() => setTimeout(3000))
                .then(() => { console.log("after timeout"); setFuji(prevState => ({ ...prevState, vote: "approved", approvedCount: prevState.approvedCount + fuji.chainBalance })) })
                .catch(() => setFuji(prevState => ({ ...prevState, vote: "null" })))
            }}
            onDenyClick={() => {
              setFuji(prevState => ({ ...prevState, vote: "waiting" }));
              // Vote Deny on Rike
              castVote(FUJI_CONTRACT)
                .then(() => setTimeout(2000))
                .then(() => { console.log("after timeout"); setFuji(prevState => ({ ...prevState, vote: "denied", deniedCount: prevState.deniedCount + fuji.chainBalance })) })
                .catch(() => setFuji(prevState => ({ ...prevState, vote: "null" })))
            }}
          />
          <ChainVoter
            chainName={"Rinkeby"}
            chainBalance={rike.chainBalance}
            isConnected={isRike}
            vote={rike.vote}
            onConnectClick={connectRike}
            onApproveClick={() => {
              setRike(prevState => ({ ...prevState, vote: "waiting" }));
              // Vote Approve on Rike
              castVote(RIKE_CONTRACT)
                .then(() => setTimeout(3000))
                .then(() => { console.log("after timeout"); setRike(prevState => ({ ...prevState, vote: "approved", approvedCount: prevState.approvedCount + rike.chainBalance })) })
                .catch(() => setRike(prevState => ({ ...prevState, vote: "null" })))

            }}
            onDenyClick={() => {
              setRike(prevState => ({ ...prevState, vote: "waiting" }));
              // Vote Deny on Rike
              castVote(RIKE_CONTRACT)
                .then(() => setTimeout(4000))
                .then(() => { console.log("after timeout"); setRike(prevState => ({ ...prevState, vote: "denied", deniedCount: prevState.deniedCount + rike.chainBalance })) })
                .catch(() => setRike(prevState => ({ ...prevState, vote: "null" })))
            }}
          />
        </div>
        <div className="col-md-4">
          <ProposalResults fuji={fuji} rike={rike} />
        </div>
      </main>
    </div>
  );
}

export default App;