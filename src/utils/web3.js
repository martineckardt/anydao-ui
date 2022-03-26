import Web3 from "web3"
// import CoinbaseWalletSDK from '@coinbase/wallet-sdk'

// const coinbaseWallet = new CoinbaseWalletSDK({
//     appName: 'anyDAO'
// })

// const ethereum = coinbaseWallet.makeWeb3Provider()

const web3 = new Web3(Web3.givenProvider)

export default web3