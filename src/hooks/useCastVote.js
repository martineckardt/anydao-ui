import web3 from '../utils/web3'
import CastVote from '../ABIs/CastVote.json'

import useConnect from './useConnect'

/**
 * Hook for casting a vote on the current chain
 */
const useCastVote = () => {
    const { currentAccount, toastMessage } = useConnect()

    const getCastVote = (address) => {
        const contract = new web3.eth.Contract(CastVote, address)
        return contract
    }

    const castVote = async (erc) => {
        const tokenContract = getCastVote(erc);
        return tokenContract.methods.castVote(1, true).send({
            from: currentAccount
        })
    }
    return {
        castVote
    }
}

export default useCastVote