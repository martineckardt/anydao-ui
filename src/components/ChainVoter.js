/**
 * Voting module for a single chain
 * @param {*} Dictionary containing information of a chain
 * - chainName: name of the chain
 * - chainBalance: governance token balance on the chain 
 * - status: Is the wallet currently connected to the chain?
 * - vote: what did the token holder vote on?
 * - onApproveClick: event handler for the approve button
 * - onDenyClick: event handler for the deny button
 * - onConnectClick: event handler for the connect button
 */
export default function ChainVoter({ status, vote, isConnected, chainName, chainBalance, onConnectClick, onApproveClick, onDenyClick }) {
    return (
        <>
            <div className="card mt-2">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h5>Vote from {chainName}</h5>
                            <p>Balance at snapshot {chainBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        </div>
                        <div className="col col-4 text-end">
                            {
                                vote === 'null' ? (<>
                                    {
                                        isConnected ? (<>
                                            <button type="button" className="btn btn-outline-success me-2" onClick={onApproveClick}>Approve</button>
                                            <button type="button" className="btn btn-outline-danger" onClick={onDenyClick}>Deny</button>
                                        </>)
                                            : <></>
                                    }
                                    {
                                        !isConnected ? (
                                            <button type="button" className="btn btn-outline-light me-2" onClick={onConnectClick}>
                                                Connect to {chainName}
                                            </button>)
                                            : <></>
                                    }
                                </>) : <></>
                            }
                            {
                                vote === 'waiting' ? (<>
                                    <button
                                        type="button"
                                        className="btn btn-outline-light btn-disabled me-2 px-5"
                                        disabled
                                    >...
                                    </button>
                                </>) : <></>
                            }
                            {
                                vote === 'approved' ? (<>
                                    <button
                                        type="button"
                                        className="btn btn-outline-success me-2"
                                    >Approved
                                    </button>
                                </>) : <></>
                            }
                            {
                                vote === 'denied' ? (<>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger me-2"
                                    >
                                        Denied
                                    </button>
                                </>) : <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}