import web3 from '../utils/web3'
import ERC20 from '../ABIs/ERC20.json'

import useConnect from './useConnect'


const useERC20Contract = () => {
    const { currentAccount } = useConnect()

    const getERC20Contract = (address) => {
        const contract = new web3.eth.Contract(ERC20, address)
        return contract
    }
    const getBalance = async (tokenAdd, userAddr) => {
        const contractERC = getERC20Contract(tokenAdd)
        try {
            const balance = await contractERC.methods.balanceOf(userAddr).call()
            return balance
        } catch (e) {
            return '0'
        }
    }
    return {
        getBalance
    }

}

export default useERC20Contract