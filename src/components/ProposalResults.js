// TODO display results from Blockchain
export default function ProposalResults() {
    return <>
        <p>VOTE to make $1INCH deflationary!</p>
        <h5>Crosschain results</h5>
        <div className="row mb-5">
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Approve</div>
                    <div className="text-success fw-bold">98.8%</div>
                </div>
                <div className="fw-bolder">146.293.191</div>
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Deny</div>
                    <div className="text-danger fw-bold">0.12%</div>
                </div>
                <div className="fw-bolder">170.959</div>
            </div>
        </div>

        <div className="mb-4">Detailed Results</div>
        <h6>Fuji</h6>
        <div className="row mb-4">
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Approve</div>
                    <div className="text-success fw-bold">97.4%</div>
                </div>
                <div className="fw-bolder">146.293.191</div>
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Deny</div>
                    <div className="text-danger fw-bold">2.6%</div>
                </div>
                <div className="fw-bolder">170.959</div>
            </div>
        </div>

        <h6>Rinkeby</h6>
        <div className="row">
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Approve</div>
                    <div className="text-success fw-bold">82.4%</div>
                </div>
                <div className="fw-bolder">146.293.191</div>
            </div>
            <div className="col-md-6">
                <div className="d-flex flex-row">
                    <div className="flex-grow-1">Deny</div>
                    <div className="text-danger fw-bold">17.6%</div>
                </div>
                <div className="fw-bolder">170.959</div>
            </div>
        </div>

    </>
}