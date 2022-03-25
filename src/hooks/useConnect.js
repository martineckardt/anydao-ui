import React from 'react';
import web3 from '../utils/web3'




const useConnect = () => {
    const [currentAccount, setCurrentAccount] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState([])

    const SignOut = async () => {
        setLoading(false)
        setCurrentAccount('')
        setMessage([{ head: `Logout`, body: `To completely logout remove this site from metamask on connections`, variant: 'warning' }])
    }

    const ConnectWallet = async () => {
        console.log("Try Connect")
        try {
            await window.ethereum.enable();

            const id = await window.ethereum.request({ method: 'eth_chainId' })

            if (id === '0x4' || id === '0xA869') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setIsLogged(true)
                setCurrentAccount(accounts[0])
                return accounts[0]
            }
            else {
                console.log('Please change to Rinkeby or Fuji as we only accept those networks.')
                setMessage([{ head: "Invalid Network", body: 'Please change to Rinkeby or Fuji', variant: 'warning' }])
            }

        } catch (err) {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.')
                const messag = [{ head: "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info' }]
                setMessage(messag)

            } else if (err.code === -32002) {
                console.log('Please unlock MetaMask.')
                const messag = [{ head: "User Request Pending", body: 'Please unlock MetaMask and try agin.', variant: 'info' }]
                setMessage(messag)
            } else {
                console.error(err);
                const messag = [{ head: "Error", body: err.message, variant: 'info' }]
                setMessage(messag)
            }
        }
    }

}

export default useConnect