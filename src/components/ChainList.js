import ChainVoter from "./ChainVoter"

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