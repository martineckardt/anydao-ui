import ChainVoter from "./ChainVoter"

/**
 * A list of the chains where the governance token holder holds tokens and is eligebile to vote on.
 * @param {} Dictionary containing chains and the event handler for the vote button 
 */
export default function ChainList({ chains, handleChainVote }) {
    return <>
        {Object.entries(chains).map(([chainName, { chainBalance, status, vote }]) => <ChainVoter
            key={chainName}
            chainName={chainName}
            chainBalance={chainBalance}
            status={status}
            vote={vote}
            onApproveClick={() => handleChainVote(chainName, "approved")}
            onDenyClick={() => handleChainVote(chainName, "denied")}
            onConnectClick={() => handleChainVote(chainName, "connected")}
        />)}
    </>
}