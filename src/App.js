import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <Header />
      <Routes>
        <Route path="/" element={<ProposalDetailView />} />
      </Routes>
    </div>
  );
}

function Header() {
  return (
    <div className="row py-3">
      <p className="col-md-10">anyDAO</p>
      <p className="col-md-2">
        <button type="button" className="btn btn-outline-dark">
          Connect Wallet
        </button>
      </p>
    </div>
  )
}

function ProposalDetailView() {
  return (
    <>
      <p className="mt-5">Back</p>
      <h4>anyDAO</h4>
      <main className="row">
        <div className="col-md-8">
          <div className="card bg-light">
            <div class="card-body">
              <h3>VOTE to make $1INCH deflationary!</h3>
              <p>Implementing a strong deflationary mechanism to the 1inch token.</p>
              <p>Removing Single-Asset-Staking & Farming Completely. Replace with a deflationary mechanism.</p>
              <p>This eliminates sell pressure from the stakers as well, and everybody is incentivised as the supply decreases = more valuable… Holders will be more committed to hold the token, instead of farming/staking and then selling the token, which decreases the value of the token.</p>
            </div>
          </div>

          <div className="card bg-light mt-2">
            <div class="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h3>Vote from FUJI</h3>
                  <p>Balance at snapshot 13.000</p>
                </div>
                <div className="col text-end">
                  <button type="button" class="btn btn-outline-dark">Connect Wallet</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-light mt-2">
            <div class="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <h3>Vote from FUJI</h3>
                  <p>Balance at snapshot 13.000</p>
                </div>
                <div className="col text-end">
                  <button type="button" className="btn btn-outline-dark me-2">Approve</button>
                  <button type="button" className="btn btn-outline-dark">Deny</button>
                </div>
              </div>
            </div>
          </div>

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
    </>
  );
}


