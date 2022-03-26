export default function ChainVoter({ status, vote, chainName, chainBalance, onConnectClick, onApproveClick, onDenyClick }) {
    return (
        <>
            <div className="card mt-2">
                <div className="card-body">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h5>Vote from {chainName} {status} {vote}</h5>
                            <p>Balance at snapshot {chainBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                        </div>
                        <div className="col col-4 text-end">
                            {
                                {
                                    'disconnected': (<>
                                        <button type="button" className="btn btn-outline-light" onClick={onConnectClick}>Connect to {chainName}</button>
                                    </>),
                                    'connected': (<>
                                        {
                                            {
                                                'null': (<>
                                                    <button type="button" className="btn btn-outline-success me-2" onClick={onApproveClick}>Approve</button>
                                                    <button type="button" className="btn btn-outline-danger" onClick={onDenyClick}>Deny</button>
                                                </>),
                                                'approved': <button
                                                    type="button"
                                                    className="btn btn-outline-success me-2"
                                                >
                                                    Approved
                                                </button>,
                                                'denied': <button
                                                    type="button"
                                                    className="btn btn-outline-danger me-2"
                                                >
                                                    Denied
                                                </button>
                                            }}[vote]
                                    </>)
                                }[status]
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}