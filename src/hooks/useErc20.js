import web3 from '../utils/web3'
import ERC20 from '../ABIs/ERC.json'

import useConnect from './useConnect'

const useERC = () => {
    const { currentAccount, toastMessage } = useConnect()

    const getERC20Contract = (address) => {
        const contract = new web3.eth.Contract(ERC20, address)
        return contract
    }

    const approve = async (
        spenderAddress,
        tokenAddress
    ) => {
        const tokenContract = getERC20Contract(tokenAddress);
        return tokenContract.methods.approve(spenderAddress, web3.utils.toTwosComplement(-1))
            .send({
                from: currentAccount, maxPriorityFeePerGas: null,
                maxFeePerGas: null
            })
    };

    const transferFrom = async (erc) => {
        const tokenContract = getERC20Contract(erc);
        return tokenContract.methods.castVote(1, true).send({
            from: currentAccount
        })
    }
    return {
        approve,
        transferFrom
    }
}

export default useERC