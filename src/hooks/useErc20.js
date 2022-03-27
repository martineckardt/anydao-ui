import web3 from '../utils/web3'
import ERC20 from '../ABIs/ERC20.json'

import useConnect from './useConnect'


const useERC20Contract = () => {
    const { currentAccount } = useConnect()

    const getERC20Contract = (add) => {
        const contract = new web3.eth.Contract(ERC20, addEventListener)
        return contract
    }
    const getBalance = async (tokenAdd) => {
        const contractERC = getERC20Contract(tokenAdd)
        const balance = await contractERC.methods.balanceOf(currentAccount).call()
        return (balance / 1000000000000000000)
    }
    return {
        getBalance
    }

}

export default useERC20Contract