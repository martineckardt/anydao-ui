import React, { useState, useCallback, useEffect } from 'react';
import web3 from '../utils/web3'
import detectEthereumProvider from '@metamask/detect-provider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const useConnect = () => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFuji, setIsFuji] = useState(false);
    const [isRike, setIsRike] = useState(false);

    const toastMessage = (message = []) => {
        const editMessage = (
            <div>
                <h1>{message[0]?.head}</h1>
                <p>{message[0]?.body}</p>
            </div>
        )
        switch (message[0]?.variant) {
            case 'success':
                toast.success(editMessage, {
                    style: {
                        width: '529.47px',
                        height: '148.82px'
                    },
                    position: "bottom-left",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;
            case 'warning':
                toast.warn(editMessage, {
                    style: {
                        width: '529.47px',
                        height: '148.82px'
                    },
                    position: "bottom-left",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;
            case 'info':
                toast.info(editMessage, {
                    style: {
                        width: '529.47px',
                        height: '148.82px'
                    },
                    position: "bottom-left",
                    autoClose: 3500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                break;
            default:
                setCurrentAccount('1')
                break;
        }
    }


    const SignOut = async () => {
        setLoading(false)
        setCurrentAccount('')
        toastMessage([{ head: `Logout`, body: `To completely logout remove this site from metamask on connections`, variant: 'warning' }])


    }

    const SignIn = async () => {

        if (!web3.currentProvider) {

            const messag = [{ head: "Wallet not found", body: `Please install MetaMask!`, variant: 'warning' }]
            toastMessage(messag)



        } else {
            const address = await ConnectWallet()

            if (address)
                toastMessage([{ head: "User Login", body: `addres: ${String(address)}`, variant: 'success' }])


            setLoading(true)
        }



    }

    const ConnectWallet = async () => {
        console.log("Try Connect")
        try {
            await window.ethereum.enable();

            const id = await window.ethereum.request({ method: 'eth_chainId' })

            if (id === '0x4' || id === '0xa869') {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
                setLoading(true)
                setCurrentAccount(accounts[0])
                if (id === '0x4') {
                    setIsRike(true)
                    setIsFuji(false)
                } else {
                    setIsRike(false);
                    setIsFuji(true);
                }
                return accounts[0]
            }
            else {
                console.log('Please change to Rinkeby or Fuji as we only accept those networks. aqui')
                toastMessage([{ head: "Invalid Network", body: 'Please change to Rinkeby or Fuji', variant: 'warning' }])


            }

        } catch (err) {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.')
                const messag = [{ head: "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info' }]
                toastMessage(messag)



            } else if (err.code === -32002) {
                console.log('Please unlock MetaMask.')
                const messag = [{ head: "User Request Pending", body: 'Please unlock MetaMask and try agin.', variant: 'info' }]
                toastMessage(messag)


            } else {
                console.error(err);
                const messag = [{ head: "Error", body: err.message, variant: 'info' }]
                toastMessage(messag)


            }
        }
    }

    // const connectRike = 

    const handleAccountsChanged = useCallback((accounts) => {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            const messag = [{ head: "User Rejected Request", body: 'Please connect to MetaMask.', variant: 'info' }]
            toastMessage(messag)


            setCurrentAccount('')
        } else if (accounts[0] !== currentAccount) {
            setCurrentAccount(accounts[0])
            const messag = [{ head: "Account Changed", body: `addres: ${accounts[0]}`, variant: 'warning' }]
            toastMessage(messag)


            // Do any other work!
        }
    }, [])

    const handleRequestAccounts = useCallback(() => {
        window.ethereum
            .request({ method: 'eth_accounts' })
            .then(handleAccountsChanged);

        // Note that this event is emitted on page load.
        // If the array of accounts is non-empty, you're already
        // connected.
        window.ethereum.on('accountsChanged', handleAccountsChanged);
    }, [])

    const connect = useCallback(() => {
        window.ethereum
            .request({ method: 'eth_requestAccounts' })
            .then(handleAccountsChanged)

    }, [])

    const connectRike = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x4' }], //0xFA
            });
            setIsFuji(false);
            setIsRike(true);
        } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ chainId: '0x4', chainName: 'TestNet Rinkeby', nativeCurrency: { name: 'Rinkeby', symbol: 'ETH', decimals: 18 }, rpcUrls: ['https://rinkeby.arbitrum.io/rpc'], blockExplorerUrls: ['https://rinkeby.etherscan.io/'] }],
                    }); //0xFA
                } catch (addError) {
                    // handle "add" error
                    console.log(addError);
                }
            }
            // handle other "switch" errors
        }
    }

    const connectFuji = async () => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xA869' }], //0xFA
            });
            setIsRike(false)
            setIsFuji(true)
        } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask.
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ chainId: '0xA869', chainName: 'TestNet Fuji', nativeCurrency: { name: 'Fuji', symbol: 'AVAX', decimals: 18 }, rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'], blockExplorerUrls: ['https://testnet.snowtrace.io/'] }],
                    }); //0xFA
                } catch (addError) {
                    // handle "add" 
                    console.log(addError);
                }
            }
            // handle other "switch" errors
        }
    }


    useEffect(() => {
        (async () => {
            const provider = await detectEthereumProvider()
            if (provider !== null) {
                const permissions = await window.ethereum.request({ method: 'wallet_getPermissions' });
                if (permissions.length > 0) {
                    // User is already connected just straight log him in
                    ConnectWallet()
                    // setIsWalletPermissions(true)
                }
                else {
                    // User not connected initial flow
                    console.log("User has no permissions")
                    // setIsWalletPermissions(false)
                }
            } else {
                setLoading(false)
                console.log("Install MestaMask")
            }
        })()

    }, [])

    return {
        SignOut,
        SignIn,
        currentAccount,
        loading,
        isFuji,
        isRike,
        connectFuji,
        connectRike,
        toastMessage
    }

}

export default useConnect